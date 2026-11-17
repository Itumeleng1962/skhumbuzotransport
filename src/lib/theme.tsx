import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Theme = "black-gold" | "navy-light"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("sst-theme") as Theme
    return saved === "navy-light" ? "navy-light" : "black-gold"
  })

  useEffect(() => {
    localStorage.setItem("sst-theme", theme)
    const root = document.documentElement
    if (theme === "black-gold") {
      root.classList.add("dark")
      root.classList.remove("light")
    } else {
      root.classList.add("light")
      root.classList.remove("dark")
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "black-gold" ? "navy-light" : "black-gold"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
