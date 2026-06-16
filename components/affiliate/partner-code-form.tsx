"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Check, Copy, User, Mail, Phone, AlertCircle } from "lucide-react"

const CODE_REGEX = /^[a-zA-Z0-9]{0,20}$/
const STORAGE_KEY = "ht_partner_identity"

interface Identity {
  name: string
  email: string
  phone: string
}

const inputClass =
  "w-full rounded-2xl py-4 pl-12 pr-4 text-base outline-none transition-colors"
const iconStyle = {
  position: "absolute" as const,
  left: "1rem",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#94a3b8",
  pointerEvents: "none" as const,
}
const cardStyle = {
  border: "1px solid #e5e7eb",
  backgroundColor: "#ffffff",
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
}

function FieldError({ msg }: { msg: string }) {
  return (
    <div className="mt-2 flex items-start gap-2">
      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#dc2626" }} />
      <span className="text-sm" style={{ color: "#dc2626" }}>{msg}</span>
    </div>
  )
}

export function PartnerCodeForm() {
  // Step: "identity" | "code" | "done"
  const [step, setStep] = useState<"identity" | "code" | "done">("identity")
  const [identity, setIdentity] = useState<Identity>({ name: "", email: "", phone: "" })
  const [identityErrors, setIdentityErrors] = useState<Partial<Identity>>({})

  const [code, setCode] = useState("")
  const [codeError, setCodeError] = useState("")
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const previewCode = code.trim() || "YOURCODE"
  const referralLink = `https://happytides.co/launch-access?ref=${previewCode}`

  // Restore saved identity from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed: Identity = JSON.parse(saved)
        if (parsed.name && parsed.email && parsed.phone) {
          setIdentity(parsed)
          setStep("code")
        }
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  function validateIdentity(): boolean {
    const errors: Partial<Identity> = {}
    if (!identity.name.trim()) errors.name = "Please enter your full name."
    if (!identity.email.trim()) {
      errors.email = "Please enter your email."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identity.email.trim())) {
      errors.email = "Please enter a valid email address."
    }
    if (!identity.phone.trim()) {
      errors.phone = "Please enter your phone number."
    } else if (identity.phone.replace(/\D/g, "").length < 10) {
      errors.phone = "Please enter a complete phone number."
    }
    setIdentityErrors(errors)
    return Object.keys(errors).length === 0
  }

  function handleIdentitySubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateIdentity()) return

    // Save identity to waitlist immediately
    saveToWaitlist()

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(identity))
    } catch {
      // ignore storage errors
    }
    setStep("code")
  }

  async function saveToWaitlist() {
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: identity.name,
          email: identity.email,
          phone: identity.phone,
        }),
      })
      if (!response.ok) {
        console.error("[v0] Waitlist save failed (non-fatal):", await response.json())
      }
    } catch (err) {
      console.error("[v0] Waitlist save error (non-fatal):", err)
    }
  }

  function handleCodeChange(value: string) {
    if (CODE_REGEX.test(value)) {
      setCode(value)
      if (codeError) setCodeError("")
    }
  }

  async function handleCodeSubmit(e: React.FormEvent) {
    e.preventDefault()
    setCodeError("")

    const trimmed = code.trim()
    if (trimmed.length < 3) {
      setCodeError("Code must be at least 3 characters.")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/partner-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: trimmed,
          full_name: identity.name,
          email: identity.email,
          phone: identity.phone,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setCodeError(data.error || "Failed to create partner account.")
        setLoading(false)
        return
      }
      setCreated(data.code)
      setLoading(false)
    } catch (err) {
      console.error("[v0] Partner code submission error:", err)
      setCodeError("An error occurred. Please try again later.")
      setLoading(false)
    }
  }

  async function copyLink() {
    const link = `https://happytides.co/launch-access?ref=${created}`
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  // ── Success state ──────────────────────────────────────────────
  if (created) {
    const finalLink = `https://happytides.co/launch-access?ref=${created}`
    return (
      <div className="rounded-3xl p-6" style={cardStyle}>
        <div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: "#dcfce7" }}
        >
          <Check className="h-7 w-7" strokeWidth={2} style={{ color: "#16a34a" }} />
        </div>
        <h2
          className="mt-5 text-center text-2xl font-bold tracking-tight"
          style={{ color: "#0f172a" }}
        >
          Partner account created
        </h2>
        <p
          className="mt-2 text-center text-sm leading-relaxed"
          style={{ color: "#64748b" }}
        >
          Your partner code is{" "}
          <span className="font-semibold" style={{ color: "#0f172a" }}>
            {created}
          </span>
          . Share your referral link to start earning.
        </p>

        <div className="mt-6 rounded-2xl p-4" style={{ backgroundColor: "#eef2fb" }}>
          <p className="text-sm font-semibold" style={{ color: "#1e3a5f" }}>
            Your referral link
          </p>
          <p
            className="mt-2 break-all font-mono text-sm leading-relaxed"
            style={{ color: "#334155" }}
          >
            {finalLink}
          </p>
        </div>

        <button
          type="button"
          onClick={copyLink}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
        >
          {copied ? (
            <><Check className="h-5 w-5" /> Copied</>
          ) : (
            <><Copy className="h-5 w-5" /> Copy referral link</>
          )}
        </button>
      </div>
    )
  }

  // ── Step 1: Identity gate ──────────────────────────────────────
  if (step === "identity") {
    return (
      <form
        onSubmit={handleIdentitySubmit}
        noValidate
        className="rounded-3xl p-6"
        style={cardStyle}
      >
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#0f172a" }}>
          First, tell us about yourself
        </h2>
        <p className="mt-2 text-base leading-relaxed" style={{ color: "#64748b" }}>
          We need your details to set up your partner account and process payouts.
        </p>

        <div className="my-6 h-px w-full" style={{ backgroundColor: "#e5e7eb" }} />

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="p-name"
              className="block text-base font-semibold"
              style={{ color: "#0f172a" }}
            >
              Full Name <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <div className="relative mt-2">
              <User className="h-5 w-5" strokeWidth={1.8} style={iconStyle} />
              <input
                id="p-name"
                type="text"
                value={identity.name}
                onChange={(e) => {
                  setIdentity({ ...identity, name: e.target.value })
                  if (identityErrors.name) setIdentityErrors({ ...identityErrors, name: "" })
                }}
                placeholder="Your full name"
                className={inputClass}
                style={{
                  border: `1px solid ${identityErrors.name ? "#fecaca" : "#e5e7eb"}`,
                  backgroundColor: "#f8f9fa",
                  color: "#0f172a",
                }}
              />
            </div>
            {identityErrors.name && <FieldError msg={identityErrors.name} />}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="p-email"
              className="block text-base font-semibold"
              style={{ color: "#0f172a" }}
            >
              Email <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <div className="relative mt-2">
              <Mail className="h-5 w-5" strokeWidth={1.8} style={iconStyle} />
              <input
                id="p-email"
                type="email"
                value={identity.email}
                onChange={(e) => {
                  setIdentity({ ...identity, email: e.target.value })
                  if (identityErrors.email) setIdentityErrors({ ...identityErrors, email: "" })
                }}
                placeholder="you@example.com"
                className={inputClass}
                style={{
                  border: `1px solid ${identityErrors.email ? "#fecaca" : "#e5e7eb"}`,
                  backgroundColor: "#f8f9fa",
                  color: "#0f172a",
                }}
              />
            </div>
            {identityErrors.email && <FieldError msg={identityErrors.email} />}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="p-phone"
              className="block text-base font-semibold"
              style={{ color: "#0f172a" }}
            >
              Phone <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <div className="relative mt-2">
              <Phone className="h-5 w-5" strokeWidth={1.8} style={iconStyle} />
              <input
                id="p-phone"
                type="tel"
                value={identity.phone}
                onChange={(e) => {
                  const n = e.target.value.replace(/\D/g, "")
                  setIdentity({ ...identity, phone: n })
                  if (identityErrors.phone) setIdentityErrors({ ...identityErrors, phone: "" })
                }}
                placeholder="(555) 123-4567"
                className={inputClass}
                style={{
                  border: `1px solid ${identityErrors.phone ? "#fecaca" : "#e5e7eb"}`,
                  backgroundColor: "#f8f9fa",
                  color: "#0f172a",
                }}
              />
            </div>
            {identityErrors.phone && <FieldError msg={identityErrors.phone} />}
          </div>

          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-3 rounded-full py-5 text-lg font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
          >
            Continue
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>

          <p className="text-center text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            Your information is used only to set up your partner account and process payouts.
          </p>
        </div>
      </form>
    )
  }

  // ── Step 2: Choose partner code ────────────────────────────────
  return (
    <form
      onSubmit={handleCodeSubmit}
      noValidate
      className="rounded-3xl p-6"
      style={cardStyle}
    >
      {/* Identity summary bar */}
      <div
        className="mb-5 flex items-center justify-between rounded-2xl px-4 py-3"
        style={{ backgroundColor: "#eef2fb" }}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold" style={{ color: "#0f172a" }}>
            {identity.name}
          </p>
          <p className="truncate text-xs" style={{ color: "#64748b" }}>
            {identity.email}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStep("identity")}
          className="ml-3 shrink-0 text-sm font-semibold underline-offset-4 hover:underline"
          style={{ color: "#1e3a5f" }}
        >
          Edit
        </button>
      </div>

      <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#0f172a" }}>
        Create your partner account
      </h2>
      <p className="mt-2 text-base leading-relaxed" style={{ color: "#64748b" }}>
        Choose a unique code that your referrals will use
      </p>

      <div className="my-6 h-px w-full" style={{ backgroundColor: "#e5e7eb" }} />

      <label
        htmlFor="partner-code"
        className="block text-base font-semibold"
        style={{ color: "#0f172a" }}
      >
        Your Partner Code
      </label>
      <input
        id="partner-code"
        name="code"
        type="text"
        autoCapitalize="characters"
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        placeholder="HRH58"
        className="mt-2 w-full rounded-2xl px-4 py-4 text-lg outline-none transition-colors"
        style={{
          border: `1px solid ${codeError ? "#fecaca" : "#e5e7eb"}`,
          backgroundColor: "#f8f9fa",
          color: "#0f172a",
        }}
      />
      <p className="mt-2 text-sm" style={{ color: "#94a3b8" }}>
        3-20 characters, letters and numbers only
      </p>

      {/* Live referral link preview */}
      <div className="mt-5 rounded-2xl p-4" style={{ backgroundColor: "#eef2fb" }}>
        <p className="text-sm font-semibold" style={{ color: "#1e3a5f" }}>
          Your referral link will be:
        </p>
        <p
          className="mt-2 break-all font-mono text-sm leading-relaxed"
          style={{ color: "#334155" }}
        >
          {referralLink}
        </p>
      </div>

      {codeError && (
        <div
          className="mt-4 rounded-lg p-3 text-sm"
          style={{
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            border: "1px solid #fecaca",
          }}
        >
          {codeError}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group mt-5 flex w-full items-center justify-center gap-3 rounded-full py-5 text-lg font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
      >
        {loading ? "Creating..." : "Create Partner Account"}
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  )
}
