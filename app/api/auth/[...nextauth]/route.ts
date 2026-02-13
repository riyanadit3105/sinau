import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// 1. Tentukan Path yang Aman
const filePath = path.join(process.cwd(), "data", "users.json");

// 2. Helper: Baca User (Safe Mode)
const getUserByEmail = (email: string) => {
  try {
    // Cek apakah file ada
    if (!fs.existsSync(filePath)) {
      console.error(`🚨 File tidak ditemukan di: ${filePath}`);
      return null;
    }
    
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(jsonData);
    
    return users.find((u: any) => u.email === email);
  } catch (error) {
    console.error("🚨 Error saat membaca JSON:", error);
    return null;
  }
};

// 3. Helper: Tulis User (HANYA JALAN DI LOCALHOST)
const updateUserSession = (userId: string, newVersion: string) => {
  // PENTING: Jangan jalankan ini di Production (Vercel)
  if (process.env.NODE_ENV === 'production') {
      console.log("⚠️ Skipping file write on Vercel (Read-Only)");
      return;
  }

  try {
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
  } catch (error) {
    console.error("Gagal update JSON:", error);
  }
};

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

        console.log(`🔍 Login attempt: ${credentials.username} at path: ${filePath}`);

        // A. Cari User dari File JSON
        const user = getUserByEmail(credentials.username);

        if (!user) {
          console.log("❌ User tidak ditemukan di JSON");
          return null;
        }

        // B. Cek Password
        if (user.password === credentials.password) {
          console.log("✅ Password Cocok");

          const newSessionVersion = uuidv4();
          
          // C. Update Session (Hanya update file jika di Localhost)
          updateUserSession(user.id, newSessionVersion);

          // D. Return Data
          return { 
            id: user.id, 
            name: user.username || user.nama || user.name, 
            email: user.email,
            role: user.role,
            schoolId: user.schoolId,
            // Di Vercel, kita pakai versi baru di memori saja, tidak disimpan ke file
            sessionVersion: newSessionVersion 
          };
        }
        
        return null;
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.name = user.name;
        token.schoolId = (user as any).schoolId;
        token.sessionVersion = (user as any).sessionVersion;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        (session.user as any).schoolId = token.schoolId;
      }
      return session;
    }
  },

  pages: { signIn: '/login' },
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Nyalakan ini untuk melihat log di Vercel Dashboard
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };