import { DollarSign, RefreshCw, Banknote, Clock } from "lucide-react"

const benefits = [
  {
    icon: DollarSign,
    iconBg: "#ede9fe",
    iconColor: "#1e3a5f",
    title: "30% First Order Commission",
    body: "Earn 30% on every new customer's first purchase",
  },
  {
    icon: RefreshCw,
    iconBg: "#dbeafe",
    iconColor: "#2563eb",
    title: "20% Recurring Commission",
    body: "Keep earning 20% on all future orders from your referrals",
  },
  {
    icon: Banknote,
    iconBg: "#dcfce7",
    iconColor: "#16a34a",
    title: "Monthly Bank Deposits",
    body: "Payouts start on the 1st for the previous month's delivered orders",
  },
  {
    icon: Clock,
    iconBg: "#ffedd5",
    iconColor: "#ea580c",
    title: "30-Day Cookie Window",
    body: "Your referrals are tracked for 30 days after clicking your link",
  },
]

export function PartnerBenefits() {
  return (
    <div
      className="rounded-3xl p-6"
      style={{
        background: "linear-gradient(180deg, #f1ecfb 0%, #e9eefb 100%)",
      }}
    >
      <h2
        className="text-2xl font-bold tracking-tight"
        style={{ color: "#0f172a" }}
      >
        Why become a partner?
      </h2>

      <ul className="mt-6 space-y-6">
        {benefits.map(({ icon: Icon, iconBg, iconColor, title, body }) => (
          <li key={title} className="flex gap-4">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: iconBg }}
            >
              <Icon className="h-6 w-6" strokeWidth={1.8} style={{ color: iconColor }} />
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-bold leading-snug" style={{ color: "#0f172a" }}>
                {title}
              </h3>
              <p className="mt-1 text-base leading-relaxed" style={{ color: "#475569" }}>
                {body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
