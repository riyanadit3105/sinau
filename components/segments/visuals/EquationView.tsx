export function EquationView({ content, color = "text-slate-800" }: { content: string, color?: string }) {
  return (
    <div className="my-6 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex justify-center items-center">
      <h3 className={`text-2xl md:text-4xl font-black tracking-wide font-mono ${color}`}>
        {content}
      </h3>
    </div>
  )
}