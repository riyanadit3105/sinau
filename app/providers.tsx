"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";
import React, { useEffect } from "react";

// Komponen Kecil untuk Memantau Sesi
function SessionWatcher({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    // Jika session ada, TAPI membawa pesan error "SessionExpired"
    if (session && (session as any).error === "SessionExpired") {
      console.log("⚠️ Sesi kadaluwarsa (Device lain login). Logout...");
      signOut({ callbackUrl: "/login" }); // Logout paksa
    }
  }, [session]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={5}>
      {/* Bungkus children dengan Watcher */}
      <SessionWatcher>
        {children}
      </SessionWatcher>
    </SessionProvider>
  );
}