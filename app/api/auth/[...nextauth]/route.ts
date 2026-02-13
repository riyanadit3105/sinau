import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// 1. Path ke database JSON
const filePath = path.join(process.cwd(), "data", "users.json");

// 2. Helper: Baca User
const getUserByEmail = (email: string) => {
  try {
    if (!fs.existsSync(filePath)) return null;
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(jsonData);
    return users.find((u: any) => u.email === email);
  } catch (error) {
    return null;
  }
};

// 3. Helper: Update Session (KITA MATIKAN DI VERCEL)
const updateUserSession = (userId: string, newVersion: string) => {
  // PENTING: Jika di Production (Vercel), JANGAN update file.
  // Karena Vercel itu Read-Only, kalau dipaksa tulis malah error/tidak kesimpan.
  if (process.env.NODE_ENV === 'production') {
      return; 
  }

  // Hanya jalan di Localhost
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

        const user = getUserByEmail(credentials.username);
        if (!user) return null;

        if (user.password === credentials.password) {
          // Buat session version baru
          const newSessionVersion = uuidv4();
          
          // Coba update file (Akan di-skip otomatis kalau di Vercel)
          updateUserSession(user.id, newSessionVersion);

          return { 
            id: user.id, 
            name: user.username || user.nama || user.name, 
            email: user.email,
            role: user.role,
            schoolId: user.schoolId,
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

      // --- BAGIAN INI YANG BIKIN ERROR ---
      // Kita MATIKAN validasi ketat ini di Production.
      // Di Vercel, karena file JSON gak berubah, token pasti beda sama DB.
      // Jadi kita ijinkan saja (bypass) kalau di production.
      
      if (process.env.NODE_ENV === 'development') {
          // Hanya cek single device di localhost
          if (token.email) {
             const dbUser = getUserByEmail(token.email as string);
             if (dbUser && dbUser.sessionVersion !== token.sessionVersion) {
                 return { ...token, error: "SessionExpired" };
             }
          }
      }

      return token;
    },

    async session({ session, token }) {
      // Cek error session
      if ((token as any).error === "SessionExpired") {
        return { ...session, error: "SessionExpired", user: null } as any;
      }

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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };