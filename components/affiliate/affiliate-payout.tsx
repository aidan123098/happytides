const rows = [
  { label: "10 new researchers × $250", value: "$500" },
  { label: "50 recurring orders × $150", value: "$750" },
]

export function AffiliatePayout() {
  return (
    <section className="px-5 py-14" style={{ backgroundColor: "#ffffff" }}>
      <div
        className="rounded-3xl p-7"
        style={{
          border: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 32px rgba(30,58,95,0.08)",
        }}
      >
        <h3
          className="text-center text-2xl font-bold"
          style={{ color: "#0f172a" }}
        >
          Example referral value
        </h3>

        <div className="mt-8">
          {rows.map(({ label, value }, i) => (
            <div
              key={label}
              className="flex items-center justify-between py-4"
              style={
                i > 0 ? { borderTop: "1px solid #e5e7eb" } : undefined
              }
            >
              <span className="text-lg" style={{ color: "#475569" }}>
                {label}
              </span>
              <span className="text-lg font-bold" style={{ color: "#0f172a" }}>
                {value}
              </span>
            </div>
          ))}
          <div
            className="flex items-center justify-between pt-5"
            style={{ borderTop: "1px solid #e5e7eb" }}
          >
            <span className="text-lg font-bold" style={{ color: "#0f172a" }}>
              Monthly referral value
            </span>
            <span className="text-2xl font-bold" style={{ color: "#0f172a" }}>
              $1,250
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-sm" style={{ color: "#94a3b8" }}>
          Based on average referral partner activity
        </p>
      </div>
    </section>
  )
}
