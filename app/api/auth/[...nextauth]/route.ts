import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// 1. Path ke database JSON
const filePath = path.join(process.cwd(), "data", "users.json");

// 2. Helper: Cari user berdasarkan EMAIL (READ ONLY - Aman di Vercel)
const getUserByEmail = (email: string) => {
  if (!fs.existsSync(filePath)) return null;
  
  try {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(jsonData);
    return users.find((u: any) => u.email === email);
  } catch (error) {
    console.error("Error reading users.json:", error);
    return null;
  }
};

// 3. Helper: Update Session Version (WRITE - Hanya untuk Localhost)
const updateUserSession = (userId: string, newVersion: string) => {
  if (!fs.existsSync(filePath)) return;

  try {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(jsonData);
    
    const updatedUsers = users.map((user: any) => {
      if (user.id === userId) {
        return { ...user, sessionVersion: newVersion };
      }
      return user;
    });

    fs.writeFileSync(filePath, JSON.stringify(updatedUsers, null, 2));
  } catch (error) {
    console.error("Gagal update session ke JSON:", error);
  }
};

// 4. Konfigurasi Auth Utama
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        console.log("🔍 Login Attempt:", credentials.username);

        // A. Cari User
        const user = getUserByEmail(credentials.username);

        if (!user) {
          console.log("❌ Email tidak ditemukan.");
          return null;
        }

        // B. Cek Password
        if (user.password === credentials.password) {
          console.log("✅ Password Cocok!");

          const newSessionVersion = uuidv4();

          // --- LOGIC KHUSUS VERCEL ---
          // Vercel File System itu Read-Only. Kita tidak bisa fs.writeFileSync di sana.
          // Jadi, kita hanya update JSON jika di Localhost (Development).
          if (process.env.NODE_ENV === 'development') {
             updateUserSession(user.id, newSessionVersion);
          } else {
             console.log("⚠️ Production Mode: Skipping JSON write (Read-Only FS).");
          }

          // D. Return Data User ke JWT
          return { 
            id: user.id, 
            name: user.username || user.nama || user.name || "Tanpa Nama", 
            email: user.email,
            role: user.role,
            schoolId: user.schoolId, // Pastikan ini terbawa
            sessionVersion: newSessionVersion 
          };
        } else {
          console.log("❌ Password Salah.");
          return null;
        }
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user, trigger }) {
      // 1. Setup awal (Saat login berhasil)
      if (trigger === 'signIn' && user) {
        token.sessionVersion = (user as any).sessionVersion;
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.name = user.name;
        token.email = user.email;
        token.schoolId = (user as any).schoolId; 
      }

      // 2. Cek Validasi Session
      if (token.email) {
        // Kita perlu cek DB lagi untuk memastikan user belum dihapus
        const dbUser = getUserByEmail(token.email as string);

        if (!dbUser) {
           return { ...token, error: "SessionExpired" };
        }

        // --- VALIDASI SINGLE DEVICE (Hanya di Development) ---
        // Di Vercel, karena kita tidak bisa update JSON, dbUser.sessionVersion akan selalu LAMA.
        // Sedangkan token.sessionVersion adalah BARU.
        // Jika kita validasi di Vercel, pasti mismatch dan logout sendiri.
        // Jadi, validasi ketat ini hanya kita nyalakan di Development.
        if (process.env.NODE_ENV === 'development') {
            if (dbUser.sessionVersion !== token.sessionVersion) {
                return { ...token, error: "SessionExpired" };
            }
        }
        
        // Update data realtime (misal guru baru join sekolah)
        // Ini aman dilakukan di prod karena cuma update token memori, bukan file
        if (dbUser.schoolId) {
            token.schoolId = dbUser.schoolId;
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Cek error session expired
      if ((token as any).error === "SessionExpired") {
        return { ...session, error: "SessionExpired", user: null } as any;
      }

      // Masukkan data ke session client
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        (session.user as any).schoolId = token.schoolId; // Penting untuk Dashboard Guru
      }
      
      return session;
    }
  },

  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 Hari
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };