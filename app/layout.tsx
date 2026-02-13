import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. IMPORT FILE YANG BARU DIBUAT TADI
import { Providers } from "./providers"; 

// 2. IMPORT AUTH CONTEXT (WRAPPER) KAMU
import { AuthProvider } from "@/contexts/AuthContext"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sinau - Platform Belajar Matematika",
  description: "Metode CPA untuk kelas Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-slate-50 min-h-screen`}>
        
        {/* LEVEL 1: SessionProvider dari NextAuth (Wajib Paling Luar) */}
        <Providers>
          
          {/* LEVEL 2: AuthProvider Custom Kamu (Supaya kodingan lama gak error) */}
          <AuthProvider>
            {children}
          </AuthProvider>

        </Providers>

      </body>
    </html>
  );
}