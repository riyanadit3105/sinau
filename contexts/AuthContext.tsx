"use client";

import React, { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

// --- 1. IMPORT DARI GLOBAL TYPES ---
import { User } from "@/types"; 

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // --- 1. AMBIL DATA DARI NEXTAUTH (GANTINYA MANUAL COOKIE) ---
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === "loading";

  // Konversi session.user ke tipe User aplikasi kamu
  // Karena kita sudah set tipe di next-auth.d.ts, kita bisa casting aman
  const user = session?.user ? (session.user as User) : null;

  // --- 2. FUNGSI LOGIN (WRAPPER NEXTAUTH) ---
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await signIn("credentials", {
        redirect: false, 
        username: email,
        password: password,
      });

      if (result?.error) {
        console.error("Login Gagal:", result.error);
        return false;
      }

      // --- PERUBAHAN DI SINI ---
      console.log("Login Sukses! Mengalihkan ke dashboard...");
      
      // 1. Force Refresh data session
      router.refresh(); 

      // 2. Ganti router.push dengan ini:
      // Ini memaksa browser memuat ulang halaman dashboard dari nol
      window.location.href = "/dashboard"; 
      
      return true;

    } catch (error) {
      console.error("Login Error:", error);
      return false;
    }
  };

  // --- 3. FUNGSI LOGOUT (WRAPPER NEXTAUTH) ---
  const logout = async () => {
    // signOut akan otomatis hapus cookie & session
    await signOut({ 
      redirect: false, // Kita redirect manual agar lebih smooth
      callbackUrl: "/login" 
    });
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}