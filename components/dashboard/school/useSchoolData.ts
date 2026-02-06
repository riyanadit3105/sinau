"use client"
import { useState, useCallback, useEffect } from "react"

export function useSchoolData(user: any) {
  // --- STATE ---
  const [classes, setClasses] = useState<any[]>([])
  const [teachers, setTeachers] = useState<any[]>([])
  const [totalStudents, setTotalStudents] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [subscription, setSubscription] = useState(user?.subscriptionStatus || 'inactive')
  const [maxClasses, setMaxClasses] = useState(user?.maxClasses || 0)

  // Generate Kode Join Otomatis
  const uniqueSuffix = user?.id ? user.id.slice(-4) : '9999'
  const emailPrefix = user?.email?.substring(0, 2).toUpperCase() || 'SC'
  const teacherJoinCode = `JOIN-${emailPrefix}${uniqueSuffix}`

  // --- FETCH DATA ---
  const refreshData = useCallback(async () => {
    if (!user?.email) return
    try {
      // 1. Ambil Kelas
      const resClasses = await fetch('/api/classes')
      const dataClasses = await resClasses.json()
      const myClasses = dataClasses.filter((c: any) => c.schoolId === user.email)
      setClasses(myClasses)
      setTotalStudents(myClasses.reduce((acc: number, curr: any) => acc + (curr.studentsCount || 0), 0))

      // 2. Ambil Guru (Pakai ID Sekolah)
      const resTeachers = await fetch('/api/school/teachers', { 
        method: 'POST', 
        body: JSON.stringify({ schoolId: user.id }) 
      })
      const dataTeachers = await resTeachers.json()
      if(dataTeachers.success) setTeachers(dataTeachers.teachers)

    } catch (error) { console.error(error) }
  }, [user?.email, user?.id])

  useEffect(() => { refreshData() }, [refreshData])

  // --- ACTIONS ---

  // 1. Subscribe
  const subscribe = async (tier: number, cycle: string) => {
    setIsLoading(true)
    try {
        const res = await fetch('/api/school/subscribe', {
            method: 'POST',
            body: JSON.stringify({ schoolId: user.email, tier, cycle })
        })
        const data = await res.json()
        
        if (data.success) {
            alert("Paket berhasil diaktifkan!")
            setSubscription('active')
            setMaxClasses(data.user.maxClasses)
            document.cookie = `sinau_token=${encodeURIComponent(JSON.stringify(data.user))}; path=/; max-age=86400`;
            refreshData()
        }
    } catch (e) {
        alert("Gagal memproses transaksi")
    } finally {
        setIsLoading(false)
    }
  }

  // 2. Create Class
  const createClass = async (className: string) => {
    const currentLimit = maxClasses || 9;
    if (classes.length >= currentLimit) {
        alert(`Kuota penuh (${currentLimit} Kelas). Upgrade paket untuk menambah kelas.`)
        return
    }
    if (!className) return
    setIsLoading(true)
    await fetch('/api/classes', { method: 'POST', body: JSON.stringify({ schoolId: user.email, className }) })
    setIsLoading(false)
    refreshData()
  }

  // 3. Remove Teacher (LOGIKA BARU DISINI) ✅
  const removeTeacher = async (teacherEmail: string) => {
    // Validasi
    if (!user?.id) return;
    const isConfirmed = confirm("Apakah Anda yakin ingin mengeluarkan guru ini dari sekolah?\n\nAkun guru TIDAK AKAN TERHAPUS, hanya dikeluarkan dari sekolah ini.");
    if (!isConfirmed) return;

    setIsLoading(true);
    try {
        const res = await fetch('/api/school/teachers/remove', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                teacherEmail: teacherEmail,
                schoolId: user.id // ID Sekolah Admin
            })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Guru berhasil dikeluarkan.");
            refreshData(); // Auto update list guru tanpa reload page
        } else {
            alert(data.error || "Gagal menghapus guru.");
        }
    } catch (e) {
        console.error(e);
        alert("Terjadi kesalahan sistem.");
    } finally {
        setIsLoading(false);
    }
  }

  // Action Lain
  const deleteClass = async (classId: string) => { if(!confirm("Hapus kelas?")) return; await fetch('/api/classes', { method: 'DELETE', body: JSON.stringify({ classId }) }); refreshData(); }
  const updateClass = async (classId: string, newName: string) => { await fetch('/api/classes', { method: 'PUT', body: JSON.stringify({ classId, newName }) }); refreshData(); }
  
  // deleteUser ini untuk hard delete (misal hapus siswa/akun lain), biarkan saja jika diperlukan
  const deleteUser = async (email: string, role: string) => { if(!confirm(`Hapus ${role}?`)) return; await fetch('/api/school/users', { method: 'DELETE', body: JSON.stringify({ email, role }) }); refreshData(); }

  // --- RETURN ---
  return {
    classes, teachers, totalStudents, isLoading, teacherJoinCode, subscription, maxClasses,
    refreshData, 
    createClass, 
    deleteClass, 
    updateClass, 
    deleteUser, 
    removeTeacher, // <--- Jangan lupa di-export
    subscribe
  }
}