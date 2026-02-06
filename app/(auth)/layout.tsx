export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 bg-dot-pattern p-4">
      {/* Container utama dengan animasi halus */}
      <div className="w-full max-w-lg animate-in">
        {children}
      </div>
    </div>
  )
}