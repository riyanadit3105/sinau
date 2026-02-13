import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";

// 1. Path ke database JSON
// Pastikan folder 'data' sejajar dengan 'app' di root project
const filePath = path.join(process.cwd(), "data", "users.json");

export const authOptions: NextAuthOptions = {
  // Nyalakan debug agar error terlihat di Vercel Logs
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
            // 2. Baca File JSON (Read-Only)
            // Menggunakan try-catch agar tidak crash jika file belum terupload
            if (!fs.existsSync(filePath)) {
                console.log("❌ File users.json tidak ditemukan path:", filePath);
                return null;
            }

            const jsonData = fs.readFileSync(filePath, 'utf8');
            const users = JSON.parse(jsonData);

            // 3. Cari User
            const user = users.find((u: any) => u.email === credentials.username);

            if (!user) {
                console.log("❌ User tidak ditemukan.");
                return null;
            }

            // 4. Cek Password
            if (user.password === credentials.password) {
                console.log("✅ Login Berhasil:", user.name);

                // --- SOLUSI ERROR VS CODE ---
                // Tambahkan 'as any' di sini. 
                // Ini memaksa VS Code menerima object ini meskipun ada properti tambahan.
                return { 
                    id: user.id, 
                    name: user.username || user.nama || user.name, 
                    email: user.email,
                    role: user.role,
                    schoolId: user.schoolId 
                } as any;
            }
            
            console.log("❌ Password Salah.");
            return null;

        } catch (error) {
            console.error("🚨 Error System:", error);
            return null;
        }
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      // Saat login sukses, user akan ada isinya
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        
        // Casting ke 'any' agar TypeScript tidak protes baca properti custom
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
        
        // Casting ke 'any' agar TypeScript tidak protes tulis properti custom
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
    maxAge: 24 * 60 * 60, // 1 Hari
  },
  // Pastikan variabel ini ada di Vercel Settings -> Environment Variables
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };