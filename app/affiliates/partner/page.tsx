import type { Metadata } from "next"
import { BrandLogo } from "@/components/brand-logo"
import { PartnerBenefits } from "@/components/affiliate/partner-benefits"
import { PartnerCodeForm } from "@/components/affiliate/partner-code-form"

export const metadata: Metadata = {
  title: "Partner Program — HappyTides™",
  description:
    "Create your HappyTides referral partner account. Choose a unique code, get your referral link, and earn 20% on first orders and 10% recurring.",
}

export default function PartnerProgramPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#f8f9fb", color: "#1a1a2e" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-30 w-full border-b"
        style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}
      >
        <div className="mx-auto flex h-16 w-full max-w-2xl items-center justify-between px-5">
          <a href="/" aria-label="HappyTides home">
            <BrandLogo />
          </a>
          <a
            href="/affiliates"
            className="text-sm font-semibold underline-offset-4 hover:underline"
            style={{ color: "#1e3a5f" }}
          >
            Back to overview
          </a>
        </div>
      </header>

      <div className="mx-auto w-full max-w-2xl px-5 pb-16 pt-8">
        {/* Title */}
        <h1
          className="text-4xl font-bold leading-tight tracking-tight"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            color: "#0f172a",
          }}
        >
          Partner Program
        </h1>
        <p className="mt-3 text-lg leading-relaxed" style={{ color: "#475569" }}>
          Earn money by referring customers to HappyTides.
        </p>

        {/* Benefits */}
        <div className="mt-8">
          <PartnerBenefits />
        </div>

        {/* Create account form */}
        <div className="mt-8">
          <PartnerCodeForm />
        </div>
      </div>

      {/* Footer */}
      <footer
        className="px-5 py-8 text-center"
        style={{ borderTop: "1px solid #e5e7eb", backgroundColor: "#ffffff" }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
          HappyTides — Research-use products only. Not for human or veterinary use.
        </p>
      </footer>
    </main>
  )
}
