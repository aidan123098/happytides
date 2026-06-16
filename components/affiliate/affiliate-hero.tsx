import { ArrowRight } from "lucide-react"

const heroStats = [
  { value: "20%", label: "First order commission" },
  { value: "10%", label: "Lifetime recurring" },
  { value: "30 days", label: "Cookie window" },
  { value: "Monthly", label: "Payouts via bank deposit" },
]

export function AffiliateHero() {
  return (
    <section
      className="relative overflow-hidden px-5 pb-12 pt-8"
      style={{
        background: "linear-gradient(180deg, #ece9fb 0%, #e6edfb 55%, #e8f0fb 100%)",
      }}
    >
      {/* Floating vials */}
      <img
        src="/images/affiliate-vial-1.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-2 top-10 w-20 -rotate-12 opacity-95 sm:w-24"
      />
      <img
        src="/images/affiliate-vial-2.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-1 top-6 w-20 rotate-6 opacity-95 sm:w-24"
      />
      <img
        src="/images/affiliate-vial-3.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-32 w-24 -rotate-6 opacity-95 sm:w-28"
      />

      {/* Referral value card */}
      <div className="relative z-10 mt-24 max-w-[20rem]">
        <div
          className="rounded-3xl p-6"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 12px 40px rgba(30,58,95,0.12)",
          }}
        >
          <p className="text-sm leading-snug" style={{ color: "#64748b" }}>
            Example monthly referral value
          </p>
          <p
            className="mt-2 text-4xl font-bold tracking-tight"
            style={{ color: "#0f172a" }}
          >
            $1,250
          </p>
          <div className="my-4 h-px w-full" style={{ backgroundColor: "#e5e7eb" }} />
          <div className="flex items-center justify-between text-sm">
            <span style={{ color: "#64748b" }}>10 referrals</span>
            <span className="font-semibold" style={{ color: "#16a34a" }}>
              +$500
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span style={{ color: "#64748b" }}>Recurring</span>
            <span className="font-semibold" style={{ color: "#2563eb" }}>
              +$750
            </span>
          </div>
        </div>
      </div>

      {/* Headline */}
      <h1
        className="relative z-10 mt-10 text-balance text-5xl font-bold leading-[1.05] tracking-tight"
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          color: "#0f172a",
        }}
      >
        Help researchers find quality supply
      </h1>

      <p
        className="relative z-10 mt-6 text-center text-lg leading-relaxed"
        style={{ color: "#475569" }}
      >
        Refer colleagues, labs, or research teams to HappyTides. Share a trusted
        source; share in the value.
      </p>

      {/* Stats grid */}
      <dl className="relative z-10 mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
        {heroStats.map(({ value, label }) => (
          <div key={label}>
            <dt
              className="text-3xl font-bold tracking-tight"
              style={{ color: "#0f172a" }}
            >
              {value}
            </dt>
            <dd className="mt-1 text-base" style={{ color: "#64748b" }}>
              {label}
            </dd>
          </div>
        ))}
      </dl>

      {/* CTA */}
      <a
        href="/affiliates/partner"
        className="group relative z-10 mt-10 flex w-full items-center justify-center gap-3 rounded-full py-5 text-lg font-semibold transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
      >
        Apply as a Referral Partner
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </a>
    </section>
  )
}
