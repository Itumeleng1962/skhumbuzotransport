import { Link } from "react-router-dom"
import { PageHero } from "@/components/layout/PageHero.tsx"
import { Container } from "@/components/layout/Section.tsx"
import { Button } from "@/components/ui/button.tsx"
import { brand } from "@/content/site.ts"

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A named desk for the school run."
        text={`${brand.name} is a South African school transport business. The public site is the introduction. The portals are how parents, drivers and the desk will share one journey without sharing it with everyone.`}
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-base leading-7 text-mist">
            <p className="text-lg text-navy">
              The name on the business is Skhumbuzo Sithole. This page does not invent a biography, a company number, a depot or a promise about how many children already travel with us.
            </p>
            <p>
              What the business is for is simpler. Learners need to get to school and home again. Households want to know which driver and which vehicle that is. Drivers need the list for their own trip. The desk needs a record that can be checked later.
            </p>
            <p>
              The Toyota Quantum is the vehicle the service is built around: a high-roof minibus with a sliding door, the shape families already see on South African roads. We are not dressing the service up as an American yellow school bus.
            </p>
            <p>
              This website is the December presentation release. You can read the service, the safety rules and the shape of the three portals. You cannot yet create an account, store a child, or follow a live vehicle. That is the next phase, on the same web application, not a separate phone app.
            </p>
          </div>
          <aside className="h-fit rounded-3xl bg-navy p-6 text-white">
            <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">This release</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/80">
              <li>Public pages: home, about, services, fleet, safety and contact.</li>
              <li>Sign-in screens for parents, drivers and admin.</li>
              <li>Portal outlines, with no records behind them.</li>
            </ul>
            <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-gold uppercase">Next</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/80">
              <li>Supabase accounts, with roles that people cannot grant themselves.</li>
              <li>Learner, route and trip records.</li>
              <li>Trip location only while an authorised trip is open.</li>
            </ul>
            <Button asChild className="mt-6" variant="gold">
              <Link to="/contact">Contact</Link>
            </Button>
          </aside>
        </Container>
      </section>
    </>
  )
}
