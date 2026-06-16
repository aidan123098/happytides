import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { AffiliateHero } from "@/components/affiliate/affiliate-hero"
import { AffiliateValue } from "@/components/affiliate/affiliate-value"
import { AffiliateSteps } from "@/components/affiliate/affiliate-steps"
import { AffiliatePayout } from "@/components/affiliate/affiliate-payout"
import { AffiliateWhy } from "@/components/affiliate/affiliate-why"

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
            Create your partner account, choose a unique code, and get your referral
            link in seconds.
          </p>
          <a
            href="/affiliates/partner"
            className="group mx-auto flex w-full max-w-md items-center justify-center gap-3 rounded-full py-5 text-lg font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
          >
            Create Partner Account
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
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
