import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";

// 1. Path ke database JSON
const filePath = path.join(process.cwd(), "data", "users.json");

export const authOptions: NextAuthOptions = {
  // Nyalakan debug
  debug: true,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
            // Cek file ada atau tidak
            if (!fs.existsSync(filePath)) {
                console.log("❌ File users.json tidak ditemukan");
                return null;
            }

            const jsonData = fs.readFileSync(filePath, 'utf8');
            const users = JSON.parse(jsonData);

            const user = users.find((u: any) => u.email === credentials.username);

            if (!user) {
                console.log("❌ User tidak ditemukan");
                return null;
            }

            if (user.password === credentials.password) {
                console.log("✅ Login Berhasil:", user.name);
                
                // Return data user (pakai 'as any' biar VS Code gak merah)
                return { 
                    id: user.id, 
                    name: user.username || user.nama || user.name, 
                    email: user.email,
                    role: user.role,
                    schoolId: user.schoolId 
                } as any;
            }
            
            return null;

        } catch (error) {
            console.error("🚨 Error:", error);
            return null;
        }
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = (user as any).role;
        token.schoolId = (user as any).schoolId;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        (session.user as any).role = token.role;
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
    maxAge: 30 * 24 * 60 * 60, // 30 Hari
  },

  // --- BAGIAN PENTING (SOLUSI ERROR NO_SECRET) ---
  // Kita kasih 'ATAU' (||).
  // Kalau process.env.NEXTAUTH_SECRET kosong, dia akan pakai string di sebelah kanan.
  // Ganti string ini bebas, yang penting panjang.
  secret: process.env.NEXTAUTH_SECRET || "rahasia-dapur-sinau-paling-aman-sedunia-2024",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };