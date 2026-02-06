import { redirect } from "next/navigation";

export default function RootPage() {
  // Karena middleware sudah memblokir user yang belum login,
  // siapa pun yang sampai di halaman ini PASTI sudah login.
  // Maka, kita langsung arahkan ke Dashboard.
  
  redirect("/dashboard");
}