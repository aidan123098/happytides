import { ArrowRight, Box, FileText, FlaskConical, ShieldCheck } from "lucide-react"

const guarantees = [
  {
    icon: ShieldCheck,
    title: "COA Included",
    body: "Certificates of Analysis available for every batch.",
  },
  {
    icon: FileText,
    title: "Batch Documented",
    body: "Each lot is recorded and traceable.",
  },
  {
    icon: FlaskConical,
    title: "Research-Use Labeled",
    body: "Clearly labeled for laboratory research.",
  },
]

export function HeroSection() {
  return (
    <section className="grid w-full grid-cols-1 lg:min-h-0 lg:flex-1 lg:grid-cols-2 lg:grid-rows-2">
      {/* Top-left: headline */}
      <div className="flex flex-col justify-center bg-background px-6 py-10 sm:px-10 lg:min-h-0 lg:py-8 lg:pl-[clamp(2rem,5vw,5rem)] lg:pr-12">
        <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-[clamp(2.5rem,4vw,3.75rem)]">
          Research Peptides You Can Trust
        </h1>

        <div className="mt-5 h-px w-12 bg-ink/40" />

        <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
          Research-use peptide materials with Certificate of Analysis on every
          batch. Batch documentation, COA access, and clear labeling you can rely
          on.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-5">
          <button
            type="button"
            className="group inline-flex items-center gap-3 rounded-full bg-ink py-1.5 pl-6 pr-1.5 text-sm font-semibold text-background transition-colors hover:bg-navy"
          >
            Browse Catalog
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-ink transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-navy"
          >
            Build Kit
            <Box className="h-4 w-4" strokeWidth={1.8} />
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-navy" />
          Research use only. Not for human or veterinary use.
        </p>
      </div>

      {/* Top-right: floating vials */}
      <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-lavender lg:min-h-0">
        <img
          src="/images/vials-hero.png"
          alt="HappyTides research peptide vials: GLP3-RT, BPC-157, NAD+, and TB-500"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Bottom-left: kit box */}
      <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-lavender-deep lg:min-h-0">
        <img
          src="/images/kit-box.png"
          alt="HappyTides GLP3-RT peptide vials presented in a premium documentation kit box"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Bottom-right: guarantee */}
      <div className="flex flex-col justify-center bg-background px-6 py-10 sm:px-10 lg:min-h-0 lg:py-8 lg:pl-12 lg:pr-[clamp(2rem,5vw,5rem)]">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          The HappyTides Guarantee
        </p>

        <h2 className="mt-3 text-balance font-serif text-3xl font-semibold leading-[1.08] tracking-tight text-ink lg:text-[clamp(1.875rem,3vw,2.75rem)]">
          Documented Quality, Every Batch
        </h2>

        <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          We stand behind every vial with transparent documentation and rigorous
          internal standards for research and laboratory use.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {guarantees.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-navy/30"
            >
              <Icon className="h-6 w-6 text-navy" strokeWidth={1.6} />
              <h3 className="mt-3 text-sm font-semibold text-ink">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
