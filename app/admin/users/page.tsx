import { promises as fs } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// --- FUNGSI HELPER ---
async function getUsers() {
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
}

// --- KOMPONEN UTAMA ---
export default async function AdminUsersPage() {
  // 1. LOGIKA KEAMANAN
  // PERBAIKAN DI SINI: Tambahkan 'await' sebelum cookies()
  const cookieStore = await cookies(); 
  const token = cookieStore.get('sinau_token');

  // Jika tidak ada token, tendang ke login
  if (!token) {
    redirect('/login');
  }

  let currentUser;
  try {
    currentUser = JSON.parse(decodeURIComponent(token.value));
  } catch (e) {
    redirect('/login');
  }

  // GATEKEEPER: Hanya Admin yang boleh masuk
  if (currentUser.role !== 'admin') {
    redirect('/dashboard');
  }

  // 2. AMBIL DATA
  const users = await getUsers();

  // 3. RENDER TAMPILAN
  return (
    <div className="min-h-screen p-8 bg-slate-50 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-900">Database Pengguna (Secured)</h1>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
            Total: {users.length} Akun
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">Nama</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Email / Info</th>
                  <th className="px-6 py-4">Sekolah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user: any, index: number) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {user.name || user.schoolName}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${user.role === 'student' ? 'bg-blue-100 text-blue-800' : ''}
                        ${user.role === 'teacher' ? 'bg-purple-100 text-purple-800' : ''}
                        ${user.role === 'school' ? 'bg-orange-100 text-orange-800' : ''}
                        ${user.role === 'admin' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {user.email || user.address || "-"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {user.school || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <p className="text-xs text-slate-400 text-center">
          Halaman ini dilindungi. Hanya admin yang bisa melihat.
        </p>
      </div>
    </div>
  );
}