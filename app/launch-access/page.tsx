import {
  ClipboardList,
  FileText,
  FlaskConical,
  Lock,
  ShieldCheck,
} from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { LaunchAccessForm } from "@/components/launch-access-form"

const trustItems = [
  { icon: ShieldCheck, top: "COA", bottom: "included" },
  { icon: FileText, top: "Batch", bottom: "documented" },
  { icon: Lock, top: "Secure", bottom: "signup" },
  { icon: FlaskConical, top: "Research-use", bottom: "labeled" },
]

const footerItems = [
  { icon: ShieldCheck, label: "COA-first catalog" },
  { icon: ClipboardList, label: "Batch-level records" },
  { icon: Lock, label: "Secure form" },
]

export default function LaunchAccessPage() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "#ffffff", color: "#1a1a2e" }}
    >
      {/* Header */}
      <header
        className="w-full border-b"
        style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}
      >
        <div className="mx-auto flex h-16 w-full max-w-2xl items-center justify-between px-5">
          <a href="/" aria-label="HappyTides home">
            <BrandLogo />
          </a>
        </div>
      </header>

      <div className="mx-auto w-full max-w-2xl">
        {/* Hero — full-width background image with transparent text overlay on left */}
        <section
          className="relative overflow-hidden"
          style={{
            backgroundImage: "url(/images/launch-hero-full.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "45% 38%",
            minHeight: "360px",
            marginLeft: "-125.001px",
          }}
        >
          {/* Text overlay — transparent background, positioned left */}
          <div className="relative z-10 flex h-full flex-col justify-center px-5 py-10" style={{ maxWidth: "50%" }}>
            <span
              className="inline-flex w-fit items-center rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{
                backgroundColor: "rgba(255,255,255,0.78)",
                color: "#1e3a5f",
                marginLeft: "115px",
                marginRight: "-48px",
                textAlign: "center",
              }}
            >
              Launch Access
            </span>

            <h1
              className="mt-4 tracking-tight"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontWeight: 900,
                fontSize: "29px",
                lineHeight: "1.4001em",
                color: "#0f172a",
                marginLeft: "109.001px",
                marginRight: "-145.001px",
                marginTop: "16.001px",
              }}
            >
              HappyTides<br />Launch Access
            </h1>

            <p
              className="mt-3 leading-relaxed"
              style={{
                fontSize: "13.001px",
                color: "#1e3a5f",
                marginLeft: "115px",
                marginRight: "-66.001px",
                marginTop: "12.001px",
                lineHeight: "1.63em",
              }}
            >
              Receive catalog availability updates, batch documentation notices,
              and launch access for research-use products.
            </p>
          </div>
        </section>

        {/* Trust row */}
        <section className="px-3 py-5" style={{ backgroundColor: "#ffffff" }}>
          <ul className="flex items-stretch overflow-hidden">
            {trustItems.map(({ icon: Icon, top, bottom }, i) => (
              <li
                key={top}
                className="flex flex-1 items-center gap-2 px-1"
                style={i > 0 ? { borderLeft: "1px solid #e5e7eb" } : {}}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#dfe8f5" }}
                >
                  <Icon
                    className="h-4 w-4"
                    strokeWidth={1.8}
                    style={{ color: "#1e3a5f" }}
                  />
                </span>
                <div className="min-w-0 leading-tight">
                  <p className="text-[11px] font-semibold" style={{ color: "#0f172a", marginLeft: i === 3 ? "-5px" : "0px" }}>
                    {top}
                  </p>
                  <p className="text-[11px]" style={{ color: "#64748b", marginLeft: i === 3 ? "-3px" : "0px" }}>
                    {bottom}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Form */}
        <section className="px-4 pb-8" style={{ backgroundColor: "#ffffff" }}>
          <LaunchAccessForm />
        </section>

        {/* Footer */}
        <footer
          className="px-4 py-5"
          style={{
            borderTop: "1px solid #e5e7eb",
            backgroundColor: "#ffffff",
          }}
        >
          <ul className="flex items-center justify-between">
            {footerItems.map(({ icon: Icon, label }, i) => (
              <li
                key={label}
                className="flex flex-1 items-center justify-center gap-2 px-2 text-center"
                style={
                  i > 0
                    ? { borderLeft: "1px solid #e5e7eb" }
                    : {}
                }
              >
                <Icon
                  className="h-4 w-4 shrink-0"
                  strokeWidth={1.8}
                  style={{ color: "#1e3a5f" }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: "#0f172a" }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </main>
  )
}
