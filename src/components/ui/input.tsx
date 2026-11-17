import type { InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils.ts"

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-line bg-white px-4 py-3 text-base text-navy shadow-sm outline-none transition placeholder:text-mist/70 focus:border-navy focus:ring-2 focus:ring-gold/70",
        className,
      )}
      {...props}
    />
  )
}
