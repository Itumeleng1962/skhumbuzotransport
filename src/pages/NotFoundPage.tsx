import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"
import { Container } from "@/components/layout/Section.tsx"

export function NotFoundPage() {
  return (
    <Container className="py-24">
      <p className="text-xs font-semibold tracking-[0.18em] text-green uppercase">404</p>
      <h1 className="mt-3 text-4xl font-extrabold text-navy">This page is not on the site.</h1>
      <p className="mt-3 max-w-lg text-mist">The address does not match a public page or a portal outline.</p>
      <Button asChild className="mt-6" variant="navy">
        <Link to="/">Back home</Link>
      </Button>
    </Container>
  )
}
