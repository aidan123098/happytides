const stats = [
  {
    value: "30%",
    title: "First Order",
    desc: "Referral value on new researchers",
  },
  {
    value: "20%",
    title: "Recurring",
    desc: "On every reorder",
  },
  {
    value: "99%+",
    title: "Purity",
    desc: "Third-party identity tested",
  },
  {
    value: "CoA",
    title: "Every Batch",
    desc: "Certificate of Analysis",
  },
]

const features = [
  {
    title: "Research-grade supply",
    desc: "Consistent quality and documented batch records for reproducible research",
  },
  {
    title: "Simple to share",
    desc: "Get a unique referral link to share with researchers, colleagues, or labs",
  },
]

export function AffiliateValue() {
  return (
    <section className="px-5 py-14" style={{ backgroundColor: "#ffffff" }}>
      <h2
        className="text-balance text-4xl font-bold leading-tight tracking-tight"
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          color: "#0f172a",
        }}
      >
        Built for research referrals
      </h2>
      <p className="mt-5 text-center text-lg leading-relaxed" style={{ color: "#475569" }}>
        Help researchers find a supply chain with the documentation they need
      </p>

      <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 text-center">
        {stats.map(({ value, title, desc }) => (
          <div key={title}>
            <dt
              className="text-4xl font-bold tracking-tight"
              style={{ color: "#0f172a" }}
            >
              {value}
            </dt>
            <dd>
              <p
                className="mt-3 text-xl font-semibold"
                style={{ color: "#0f172a" }}
              >
                {title}
              </p>
              <p
                className="mt-2 text-base leading-snug"
                style={{ color: "#64748b" }}
              >
                {desc}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-14 space-y-10">
        {features.map(({ title, desc }) => (
          <div key={title}>
            <h3 className="text-xl font-bold" style={{ color: "#0f172a" }}>
              {title}
            </h3>
            <p
              className="mt-3 text-lg leading-relaxed"
              style={{ color: "#64748b" }}
            >
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
