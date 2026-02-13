import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// 1. Path ke database JSON
const filePath = path.join(process.cwd(), "data", "users.json");

// 2. Helper: Cari user berdasarkan EMAIL
const getUserByEmail = (email: string) => {
  if (!fs.existsSync(filePath)) return null;
  
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(jsonData);
  
  // Mencari user yang kolom 'email'-nya cocok
  return users.find((u: any) => u.email === email);
};

// 3. Helper: Update Session Version (Untuk keamanan Single Device)
const updateUserSession = (userId: string, newVersion: string) => {
  if (!fs.existsSync(filePath)) return;

  const jsonData = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(jsonData);
  
  const updatedUsers = users.map((user: any) => {
    if (user.id === userId) {
      return { ...user, sessionVersion: newVersion };
    }
    return user;
  });

  fs.writeFileSync(filePath, JSON.stringify(updatedUsers, null, 2));
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

        console.log("🔍 Login via Email:", credentials.username);

        // A. Cari User
        const user = getUserByEmail(credentials.username);

        if (!user) {
          console.log("❌ Email tidak ditemukan di JSON.");
          return null;
        }

        // B. Cek Password
        if (user.password === credentials.password) {
          console.log("✅ Password Cocok! Login Sukses.");

          // C. Update Session Version (Tendang device lain)
          const newSessionVersion = uuidv4();
          updateUserSession(user.id, newSessionVersion);

          // D. Return Data User ke JWT (PENTING: Masukkan semua data yang butuh di frontend)
          return { 
            id: user.id, 
            name: user.username || user.nama || user.name || "Tanpa Nama", 
            email: user.email,
            role: user.role,
            schoolId: user.schoolId, // <--- PENTING: Masukkan schoolId disini
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
        
        // <--- PENTING: Simpan schoolId ke Token
        token.schoolId = (user as any).schoolId; 
      }

      // 2. Cek Validasi Session (Single Device Login)
      if (token.email) {
        const dbUser = getUserByEmail(token.email as string);

        // Jika user dihapus atau versi sesi beda
        if (!dbUser || dbUser.sessionVersion !== token.sessionVersion) {
          // Tandai token bermasalah
          return { ...token, error: "SessionExpired" };
        }
        
        // (Opsional) Update data terbaru dari DB jika ada perubahan realtime
        // Ini memastikan jika guru baru join sekolah, tokennya ikut update tanpa perlu relogin paksa
        if (dbUser && dbUser.schoolId) {
            token.schoolId = dbUser.schoolId;
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Cek apakah token membawa pesan error session expired?
      if ((token as any).error === "SessionExpired") {
        return { 
          ...session, 
          error: "SessionExpired", 
          user: null 
        } as any;
      }

      // Jika aman, masukkan data token ke session client
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        
        // <--- PENTING: Oper schoolId ke Frontend (Session)
        (session.user as any).schoolId = token.schoolId;
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