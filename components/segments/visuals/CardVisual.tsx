export function CardVisual({ data }: { data: any }) {
    return (
      <div className="bg-white rounded-[3rem] w-64 h-80 flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white animate-in zoom-in">
          <span className="text-[10rem] font-black text-slate-800 leading-none">{data.content || '?'}</span>
          <span className="text-2xl font-bold text-slate-400 tracking-widest mt-4">{data.subContent || ''}</span>
      </div>
    )
}