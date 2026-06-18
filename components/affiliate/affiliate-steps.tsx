const steps = [
  {
    num: "01",
    title: "Apply",
    desc: "Create your account and get a unique referral code for sharing with researchers and labs",
  },
  {
    num: "02",
    title: "Refer",
    desc: "Share your referral link with researchers, colleagues, or research teams who need quality supply",
  },
  {
    num: "03",
    title: "Share in the value",
    desc: "Receive 30% on first orders and 20% on recurring orders from researchers you refer",
  },
  {
    num: "04",
    title: "Get paid",
    desc: "Payouts start on the 1st for the previous month's delivered orders",
  },
]

export function AffiliateSteps() {
  return (
    <section
      className="px-5 py-14"
      style={{
        background: "linear-gradient(180deg, #f4f3fb 0%, #f6f8fc 100%)",
      }}
    >
      <h2
        className="text-balance text-center text-4xl font-bold leading-tight tracking-tight"
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          color: "#0f172a",
        }}
      >
        How it works
      </h2>
      <p
        className="mx-auto mt-5 max-w-md text-center text-lg leading-relaxed"
        style={{ color: "#475569" }}
      >
        A simple four-step process for referring researchers to quality supply
      </p>

      <ol className="mt-12 space-y-16">
        {steps.map(({ num, title, desc }) => (
          <li key={num} className="text-center">
            <p
              className="text-6xl font-bold tracking-tight"
              style={{ color: "#d8d8e6" }}
            >
              {num}
            </p>
            <h3
              className="mt-5 text-2xl font-bold"
              style={{ color: "#0f172a" }}
            >
              {title}
            </h3>
            <p
              className="mx-auto mt-4 max-w-md text-lg leading-relaxed"
              style={{ color: "#64748b" }}
            >
              {desc}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
