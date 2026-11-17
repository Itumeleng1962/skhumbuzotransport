import type { ReactNode } from "react"
import { cn } from "@/lib/utils.ts"

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6", className)}>
      {children}
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string
  title: string
  text?: string
  light?: boolean
}) {
  return (
    <div className="max-w-2xl">
      <p
        className={cn(
          "text-xs font-semibold tracking-[0.22em] uppercase",
          light ? "text-gold" : "text-green",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 font-extrabold tracking-tight text-3xl sm:text-4xl",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {text ? (
        <p className={cn("mt-4 text-base leading-7 sm:text-lg", light ? "text-white/75" : "text-mist")}>
          {text}
        </p>
      ) : null}
    </div>
  )
}
