"use client"
import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isPassword?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, isPassword, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const inputType = isPassword ? (showPassword ? "text" : "password") : type

    return (
      <div className="w-full space-y-2">
        {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
        <div className="relative">
          <input
            type={inputType}
            className={`flex h-12 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            ref={ref}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-slate-400 hover:text-indigo-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }