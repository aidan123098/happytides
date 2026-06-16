import type { Metadata } from "next"
import { BrandLogo } from "@/components/brand-logo"
import { AffiliateHero } from "@/components/affiliate/affiliate-hero"
import { AffiliateValue } from "@/components/affiliate/affiliate-value"
import { AffiliateSteps } from "@/components/affiliate/affiliate-steps"
import { AffiliatePayout } from "@/components/affiliate/affiliate-payout"
import { AffiliateWhy } from "@/components/affiliate/affiliate-why"
import { AffiliateApplyForm } from "@/components/affiliate/affiliate-apply-form"

export const metadata: Metadata = {
  title: "Become an Affiliate — HappyTides™",
  description:
    "Refer colleagues, labs, or research teams to HappyTides. Earn 20% on first orders and 10% lifetime recurring as a referral partner.",
}

export default function AffiliatesPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#ffffff", color: "#1a1a2e" }}>
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
            href="/launch-access"
            className="text-sm font-semibold underline-offset-4 hover:underline"
            style={{ color: "#1e3a5f" }}
          >
            Launch access
          </a>
        </div>
      </header>

      <div className="mx-auto w-full max-w-2xl">
        <AffiliateHero />
        <AffiliateValue />
        <AffiliateSteps />
        <AffiliatePayout />
        <AffiliateWhy />

        {/* Apply */}
        <section id="apply" className="px-5 py-14" style={{ backgroundColor: "#ffffff" }}>
          <h2
            className="text-balance text-center text-4xl font-bold leading-tight tracking-tight"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              color: "#0f172a",
            }}
          >
            Apply as a Referral Partner
          </h2>
          <p
            className="mx-auto mb-8 mt-5 max-w-md text-center text-lg leading-relaxed"
            style={{ color: "#475569" }}
          >
            Tell us a bit about yourself and we&apos;ll send your referral partner details.
          </p>
          <AffiliateApplyForm />
        </section>

        {/* Footer */}
        <footer
          className="px-5 py-8 text-center"
          style={{ borderTop: "1px solid #e5e7eb", backgroundColor: "#ffffff" }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
            HappyTides — Research-use products only. Not for human or veterinary use.
          </p>
        </footer>
      </div>
    </main>
  )
}
