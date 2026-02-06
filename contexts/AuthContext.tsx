"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// --- 1. IMPORT DARI GLOBAL TYPES (JANGAN DEFINISI ULANG DI SINI) ---
import { User } from "@/types"; 

// --- 2. HAPUS BAGIAN INI (KARENA SUDAH DI-IMPORT) ---
/* interface User {
  id: string;
  name?: string;
  email: string;
  role: "student" | "teacher" | "school";
  schoolId?: string | null;
  classId?: string | null;
}
*/

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Default loading TRUE
  const router = useRouter();

  // --- 1. CEK COOKIE SAAT REFRESH ---
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Regex untuk mengambil cookie 'sinau_token' dengan presisi
        const match = document.cookie.match(new RegExp('(^| )sinau_token=([^;]+)'));
        
        if (match) {
          const tokenValue = match[2];
          const userData = JSON.parse(decodeURIComponent(tokenValue));
          
          if (userData && userData.email) {
            setUser(userData);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error("Gagal restore session:", e);
        setUser(null);
      } finally {
        setIsLoading(false); // Selesai loading, apapun hasilnya
      }
    };

    checkAuth();
  }, []);

  // --- 2. FUNGSI LOGIN ---
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login gagal");
        setIsLoading(false);
        return false;
      }

      // SIMPAN COOKIE YANG KUAT (Expire 1 Hari)
      const userData = JSON.stringify(data.user);
      document.cookie = `sinau_token=${encodeURIComponent(userData)}; path=/; max-age=86400; SameSite=Lax`;
      
      setUser(data.user);
      router.push("/dashboard"); // Redirect manual
      return true;

    } catch (error) {
      console.error("Login Error:", error);
      alert("Terjadi kesalahan koneksi");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. FUNGSI LOGOUT ---
  const logout = () => {
    // Hapus Cookie dengan set expired date ke masa lalu
    document.cookie = "sinau_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setUser(null);
    router.push("/login");
    router.refresh(); // Refresh agar cache bersih
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