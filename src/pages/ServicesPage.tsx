import { PageHero } from "@/components/layout/PageHero.tsx"
import { Container } from "@/components/layout/Section.tsx"
import { services } from "@/content/site.ts"

const detail = [
  {
    title: "Morning collection",
    text: "The run starts from an agreed point and ends at the school. The time is part of the arrangement with the household, not a slogan on this website.",
  },
  {
    title: "Afternoon return",
    text: "The return uses the same idea in the other direction: a known vehicle, a known list, and a stop the household recognises.",
  },
  {
    title: "Schools and households",
    text: "A school can be the destination. The relationship that protects a child's information is with the guardian, not with every parent at the gate.",
  },
  {
    title: "What we will not claim here",
    text: "No fleet size, no on-time percentage, no insurance wording and no operating licence number until those facts are confirmed and written down properly.",
  },
] as const

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="School transport, said plainly."
        text="The service is the school-day journey. These pages describe what that arrangement is for. They do not publish operating statistics."
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="rounded-3xl border border-line bg-white p-6">
              <h2 className="text-xl font-bold text-navy">{service.title}</h2>
              <p className="mt-3 text-sm leading-6 text-mist">{service.text}</p>
            </article>
          ))}
          {detail.map((item) => (
            <article key={item.title} className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-navy">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-mist">{item.text}</p>
            </article>
          ))}
        </Container>
      </section>
    </>
  )
}
