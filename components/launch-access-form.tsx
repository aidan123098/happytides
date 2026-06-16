"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Mail, Phone, ShieldCheck, User, Tag, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

export function LaunchAccessForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({ name: "", email: "", phone: "", affiliateCode: "" })

  // Affiliate code validation state
  const [codeStatus, setCodeStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle")
  const [codeMessage, setCodeMessage] = useState("")
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounce-validate affiliate code whenever it changes
  useEffect(() => {
    const code = form.affiliateCode.trim()

    if (!code) {
      setCodeStatus("idle")
      setCodeMessage("")
      return
    }

    setCodeStatus("checking")
    setCodeMessage("")

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/partner-codes?code=${encodeURIComponent(code)}`)
        const data = await res.json()
        if (data.valid) {
          setCodeStatus("valid")
          setCodeMessage("Affiliate code applied.")
        } else {
          setCodeStatus("invalid")
          setCodeMessage(data.error || "That affiliate code doesn't exist.")
        }
      } catch {
        setCodeStatus("idle")
        setCodeMessage("")
      }
    }, 600)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [form.affiliateCode])

  function validateForm() {
    const errors: Record<string, string> = {}

    if (!form.name.trim()) {
      errors.name = "Please enter your full name"
    }

    if (!form.email.trim()) {
      errors.email = "Please enter your email address"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Please enter a valid email address (example: you@example.com)"
    }

    if (!form.phone.trim()) {
      errors.phone = "Please enter your phone number"
    } else if (form.phone.length < 10) {
      errors.phone = "Please enter a complete phone number (at least 10 digits)"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          phone: form.phone,
          affiliate_code: form.affiliateCode || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to submit. Please try again.")
        setLoading(false)
        return
      }

      setSubmitted(true)
      setLoading(false)
    } catch (err) {
      console.error("[v0] Form submission error:", err)
      setError("An error occurred. Please try again later.")
      setLoading(false)
    }
  }

  const inputClass =
    "w-full rounded-2xl py-4 pl-12 pr-4 text-base outline-none transition-colors"
  const inputStyle = {
    border: "1px solid #e5e7eb",
    backgroundColor: "#f8f9fa",
    color: "#0f172a",
  }
  const iconStyle = {
    position: "absolute" as const,
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
    pointerEvents: "none" as const,
  }

  if (submitted) {
    return (
      <div
        className="rounded-3xl p-8 text-center"
        style={{
          border: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        <div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: "#dfe8f5" }}
        >
          <ShieldCheck className="h-7 w-7" strokeWidth={1.8} style={{ color: "#1e3a5f" }} />
        </div>
        <h2
          className="mt-5 font-serif text-2xl font-semibold"
          style={{ color: "#0f172a" }}
        >
          You&apos;re on the list
        </h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "#64748b" }}>
          Thanks, {form.name || "researcher"}. We&apos;ll send catalog availability and
          launch access updates to{" "}
          <span className="font-medium" style={{ color: "#0f172a" }}>
            {form.email || "your inbox"}
          </span>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false)
            setError("")
            setForm({ name: "", email: "", phone: "", affiliateCode: "" })
          }}
          className="mt-6 text-sm font-semibold underline-offset-4 hover:underline"
          style={{ color: "#1e3a5f" }}
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl p-6"
      style={{
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="la-name"
            className="block text-base font-semibold"
            style={{ color: "#0f172a" }}
          >
            Name <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <div className="relative mt-2">
            <User className="h-5 w-5" strokeWidth={1.8} style={iconStyle} />
            <input
              id="la-name"
              name="name"
              type="text"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value })
                if (validationErrors.name) {
                  setValidationErrors({ ...validationErrors, name: "" })
                }
              }}
              placeholder="Your full name"
              className={inputClass}
              style={{
                ...inputStyle,
                borderColor: validationErrors.name ? "#fecaca" : "#e5e7eb",
              }}
            />
          </div>
          {validationErrors.name && (
            <div className="mt-2 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
              <span className="text-sm" style={{ color: "#dc2626" }}>
                {validationErrors.name}
              </span>
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="la-email"
            className="block text-base font-semibold"
            style={{ color: "#0f172a" }}
          >
            Email <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <div className="relative mt-2">
            <Mail className="h-5 w-5" strokeWidth={1.8} style={iconStyle} />
            <input
              id="la-email"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value })
                if (validationErrors.email) {
                  setValidationErrors({ ...validationErrors, email: "" })
                }
              }}
              placeholder="you@example.com"
              className={inputClass}
              style={{
                ...inputStyle,
                borderColor: validationErrors.email ? "#fecaca" : "#e5e7eb",
              }}
            />
          </div>
          {validationErrors.email && (
            <div className="mt-2 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
              <span className="text-sm" style={{ color: "#dc2626" }}>
                {validationErrors.email}
              </span>
            </div>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="la-phone"
            className="block text-base font-semibold"
            style={{ color: "#0f172a" }}
          >
            Phone <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <div className="relative mt-2">
            <Phone className="h-5 w-5" strokeWidth={1.8} style={iconStyle} />
            <input
              id="la-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => {
                const numbersOnly = e.target.value.replace(/\D/g, "")
                setForm({ ...form, phone: numbersOnly })
                if (validationErrors.phone) {
                  setValidationErrors({ ...validationErrors, phone: "" })
                }
              }}
              placeholder="(555) 123-4567"
              className={inputClass}
              style={{
                ...inputStyle,
                borderColor: validationErrors.phone ? "#fecaca" : "#e5e7eb",
              }}
            />
          </div>
          {validationErrors.phone && (
            <div className="mt-2 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
              <span className="text-sm" style={{ color: "#dc2626" }}>
                {validationErrors.phone}
              </span>
            </div>
          )}
        </div>

        {/* Affiliate Code */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor="la-affiliate"
              className="block text-base font-semibold"
              style={{ color: "#0f172a" }}
            >
              Affiliate Code{" "}
              <span className="text-sm font-normal" style={{ color: "#64748b" }}>
                (Optional)
              </span>
            </label>
            <a
              href="/affiliates"
              className="shrink-0 text-sm font-semibold underline-offset-4 hover:underline"
              style={{ color: "#1e3a5f" }}
            >
              Become an affiliate?
            </a>
          </div>
          <div className="relative mt-2">
            <Tag className="h-5 w-5" strokeWidth={1.8} style={iconStyle} />
            <input
              id="la-affiliate"
              name="affiliateCode"
              type="text"
              value={form.affiliateCode}
              onChange={(e) => setForm({ ...form, affiliateCode: e.target.value })}
              placeholder="Enter your affiliate code"
              className={inputClass}
              style={{
                ...inputStyle,
                borderColor:
                  codeStatus === "valid"
                    ? "#86efac"
                    : codeStatus === "invalid"
                    ? "#fecaca"
                    : "#e5e7eb",
                paddingRight: codeStatus !== "idle" ? "2.75rem" : "1rem",
              }}
            />
            {/* Status icon on the right */}
            {codeStatus === "checking" && (
              <Loader2
                className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin"
                style={{ color: "#94a3b8" }}
              />
            )}
            {codeStatus === "valid" && (
              <CheckCircle2
                className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
                style={{ color: "#16a34a" }}
              />
            )}
            {codeStatus === "invalid" && (
              <AlertCircle
                className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
                style={{ color: "#dc2626" }}
              />
            )}
          </div>
          {/* Feedback message */}
          {codeStatus === "valid" && (
            <p className="mt-1.5 text-sm font-medium" style={{ color: "#16a34a" }}>
              {codeMessage}
            </p>
          )}
          {codeStatus === "invalid" && (
            <div className="mt-2 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
              <span className="text-sm" style={{ color: "#dc2626" }}>
                {codeMessage}
              </span>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-3 rounded-full py-5 text-lg font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
        >
          {loading ? "Submitting..." : "Gain Access"}
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
          />
        </button>

        {/* Error message */}
        {error && (
          <div
            className="rounded-lg p-3 text-sm"
            style={{
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              border: "1px solid #fecaca",
            }}
          >
            {error}
          </div>
        )}

        {/* No spam */}
        <div className="flex items-center justify-center gap-2.5">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full"
            style={{ backgroundColor: "#dfe8f5" }}
          >
            <ShieldCheck className="h-4 w-4" strokeWidth={1.8} style={{ color: "#1e3a5f" }} />
          </span>
          <p className="text-sm" style={{ color: "#64748b" }}>
            Private launch updates only. No spam.
          </p>
        </div>

        {/* Disclaimer */}
        <p
          className="text-center text-sm leading-relaxed"
          style={{ color: "#64748b" }}
        >
          By submitting, you agree to receive HappyTides updates.{" "}
          Research-use products only. Not for human or veterinary use.
        </p>
      </div>
    </form>
  )
}
