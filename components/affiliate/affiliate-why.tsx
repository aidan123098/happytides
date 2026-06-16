const reasons = [
  {
    title: "Trusted documentation",
    desc: "Every batch ships with a Certificate of Analysis and third-party identity testing your referrals can rely on.",
  },
  {
    title: "Reliable recurring value",
    desc: "Earn on first orders and on every reorder, so a single quality referral keeps paying over time.",
  },
  {
    title: "Built for research teams",
    desc: "Consistent supply and batch-level records that labs, colleagues, and research teams actually need.",
  },
]

export function AffiliateWhy() {
  return (
    <section
      className="px-5 py-14"
      style={{
        background: "linear-gradient(180deg, #f6f8fc 0%, #eef0fa 100%)",
      }}
    >
      <h2
        className="text-balance text-center text-4xl font-bold leading-tight tracking-tight"
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          color: "#0f172a",
        }}
      >
        Why refer researchers to us
      </h2>

      <div className="mt-12 space-y-5">
        {reasons.map(({ title, desc }) => (
          <div
            key={title}
            className="rounded-2xl p-6"
            style={{
              border: "1px solid #e5e7eb",
              backgroundColor: "#ffffff",
            }}
          >
            <h3 className="text-xl font-bold" style={{ color: "#0f172a" }}>
              {title}
            </h3>
            <p
              className="mt-3 text-base leading-relaxed"
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
