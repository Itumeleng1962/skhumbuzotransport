import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Phone, Mail, MapPin, CheckCircle2, Clock, Send } from "lucide-react"
import { PageHero } from "@/components/layout/PageHero.tsx"
import { Container } from "@/components/layout/Section.tsx"
import { Button } from "@/components/ui/button.tsx"
import { useTheme } from "@/lib/theme.tsx"

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(10, "Please enter a valid phone number."),
  interest: z.enum(["parent", "school", "driver", "partner"]),
  message: z.string().trim().min(10, "Please write a short message or inquiry."),
})

type FormValues = z.infer<typeof schema>

export function ContactPage() {
  const [sent, setSent] = useState<FormValues | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "black-gold"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", interest: "parent", message: "" },
  })

  return (
    <>
      <PageHero
        eyebrow="Direct Line"
        title="Contact Operations & School Transport Desk"
        text="Speak directly with our Johannesburg dispatch office regarding learner enrollment, daily route corridors, or school partner arrangements."
      />
      <section className={`py-14 sm:py-20 transition-colors ${isDark ? "bg-[#0B0B0E]" : "bg-[#f8fafc]"}`}>
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          
          {/* Left: Contact Info & Photo Card */}
          <div className="space-y-6">
            <div className={`overflow-hidden rounded-3xl border shadow-xl ${
              isDark ? "bg-[#141419] border-[#262630] text-white" : "bg-white border-slate-200 text-slate-800"
            }`}>
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/hero-quantum-bg.jpg"
                  alt="Skhumbuzo Sithole Transport Quantum Minibus"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 rounded-full bg-[#D4AF37] px-3 py-1 text-[11px] font-extrabold text-black">
                  Johannesburg Dispatch
                </span>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-black">Get in Touch Directly</h3>
                <div className="space-y-3 text-xs">
                  <a
                    href="tel:08007484653"
                    className="flex items-center gap-3 p-3 rounded-2xl border border-white/10 hover:border-[#D4AF37] transition group bg-white/5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/20 text-[#F5C542]">
                      <Phone size={16} />
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">Toll-Free Dispatch Desk</div>
                      <div className="font-extrabold text-sm text-[#F5C542]">0800 748 4653</div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/27825554912"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-2xl border border-white/10 hover:border-emerald-400 transition group bg-white/5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Send size={16} />
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">WhatsApp Dispatch</div>
                      <div className="font-extrabold text-sm text-emerald-400">+27 82 555 4912</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-2xl border border-white/10 bg-white/5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                      <Mail size={16} />
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">Direct Email</div>
                      <div className="font-bold text-xs text-white">dispatch@sitholetransport.co.za</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl border border-white/10 bg-white/5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/20 text-[#F5C542]">
                      <Clock size={16} />
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">Service Hours</div>
                      <div className="font-bold text-xs text-white">Mon – Fri: 06:00 to 18:00</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl border border-white/10 bg-white/5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">Service Area</div>
                      <div className="font-bold text-xs text-white">Greater Johannesburg & Surrounding Suburbs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Working Form */}
          <div className={`rounded-3xl border p-6 sm:p-8 shadow-xl ${
            isDark ? "bg-[#141419] border-[#262630] text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            {sent ? (
              <div className="rounded-2xl p-6 text-center space-y-3 bg-emerald-500/10 border border-emerald-500/30">
                <div className="h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-white">Message Transmitted!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <strong>{sent.name}</strong>. Your inquiry has been registered with our dispatch team. We will call you on <strong>{sent.phone}</strong> shortly.
                </p>
                <div className="p-4 rounded-xl bg-[#18181F] text-xs text-slate-400 max-w-md mx-auto border border-white/10">
                  <span className="font-bold text-[#F5C542]">Note:</span> "{sent.message}"
                </div>
                <Button
                  className="mt-4 bg-[#D4AF37] hover:bg-[#F5C542] text-black font-bold text-xs rounded-xl"
                  onClick={() => setSent(null)}
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form className="space-y-4" noValidate onSubmit={handleSubmit((values) => setSent(values))}>
                <div className="border-b border-white/10 pb-3">
                  <h2 className="text-xl font-black">Send Inquiry or Enrollment Question</h2>
                  <p className="text-xs text-slate-400 mt-1">Fill out the details below and our operations manager will respond promptly.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-300">Your Full Name *</span>
                    <input
                      placeholder="e.g. Itumeleng Sithole"
                      className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3.5 py-2.5 text-sm text-white outline-hidden focus:border-[#D4AF37]"
                      {...register("name")}
                    />
                    {errors.name ? <span className="mt-1 block text-xs text-red-400">{errors.name.message}</span> : null}
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-300">Mobile Number *</span>
                    <input
                      placeholder="082 123 4567"
                      className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3.5 py-2.5 text-sm text-white outline-hidden focus:border-[#D4AF37]"
                      {...register("phone")}
                    />
                    {errors.phone ? <span className="mt-1 block text-xs text-red-400">{errors.phone.message}</span> : null}
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-300">Email Address *</span>
                    <input
                      type="email"
                      placeholder="parent@gmail.com"
                      className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3.5 py-2.5 text-sm text-white outline-hidden focus:border-[#D4AF37]"
                      {...register("email")}
                    />
                    {errors.email ? <span className="mt-1 block text-xs text-red-400">{errors.email.message}</span> : null}
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-300">I am contacting as</span>
                    <select
                      className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3.5 py-2.5 text-sm text-white outline-hidden focus:border-[#D4AF37]"
                      {...register("interest")}
                    >
                      <option value="parent">A Parent or Guardian</option>
                      <option value="school">A School Administrator</option>
                      <option value="driver">A Certified Driver</option>
                      <option value="partner">Corporate / Fleet Partner</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-300">Your Message or School Run Details *</span>
                  <textarea
                    rows={4}
                    placeholder="Provide details about your child's school, residential suburb, and requirements..."
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3.5 py-2.5 text-sm text-white outline-hidden focus:border-[#D4AF37]"
                    {...register("message")}
                  />
                  {errors.message ? <span className="mt-1 block text-xs text-red-400">{errors.message.message}</span> : null}
                </label>

                <Button
                  className="w-full rounded-xl bg-gradient-to-r from-[#F5C542] via-[#D4AF37] to-[#AA820A] py-3.5 text-sm font-extrabold text-black hover:brightness-110 shadow-lg transition"
                  type="submit"
                >
                  <Send size={16} className="mr-2" /> Submit Inquiry
                </Button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}
