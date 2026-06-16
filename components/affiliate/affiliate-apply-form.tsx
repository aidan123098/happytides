"use client"

import { useState } from "react"
import { ArrowRight, Mail, Phone, User, Users, AlertCircle, ShieldCheck } from "lucide-react"

export function AffiliateApplyForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({ name: "", email: "", phone: "", audience: "" })

  function validateForm() {
    const errors: Record<string, string> = {}
    if (!form.name.trim()) errors.name = "Please enter your full name"
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
    if (!validateForm()) return
    setLoading(true)
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          phone: form.phone,
          affiliate_code: form.audience
            ? `AFFILIATE APPLICATION — ${form.audience}`
            : "AFFILIATE APPLICATION",
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
      console.error("[v0] Affiliate form submission error:", err)
      setError("An error occurred. Please try again later.")
      setLoading(false)
    }
  }

  const inputClass = "w-full rounded-2xl py-4 pl-12 pr-4 text-base outline-none transition-colors"
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
        <h2 className="mt-5 font-serif text-2xl font-semibold" style={{ color: "#0f172a" }}>
          Application received
        </h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "#64748b" }}>
          Thanks, {form.name || "partner"}. We&apos;ll review your application and send
          referral partner details to{" "}
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
            setForm({ name: "", email: "", phone: "", audience: "" })
          }}
          className="mt-6 text-sm font-semibold underline-offset-4 hover:underline"
          style={{ color: "#1e3a5f" }}
        >
          Submit another application
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
          <label htmlFor="af-name" className="block text-base font-semibold" style={{ color: "#0f172a" }}>
            Name <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <div className="relative mt-2">
            <User className="h-5 w-5" strokeWidth={1.8} style={iconStyle} />
            <input
              id="af-name"
              name="name"
              type="text"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value })
                if (validationErrors.name) setValidationErrors({ ...validationErrors, name: "" })
              }}
              placeholder="Your full name"
              className={inputClass}
              style={{ ...inputStyle, borderColor: validationErrors.name ? "#fecaca" : "#e5e7eb" }}
            />
          </div>
          {validationErrors.name && (
            <div className="mt-2 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
              <span className="text-sm" style={{ color: "#dc2626" }}>{validationErrors.name}</span>
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="af-email" className="block text-base font-semibold" style={{ color: "#0f172a" }}>
            Email <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <div className="relative mt-2">
            <Mail className="h-5 w-5" strokeWidth={1.8} style={iconStyle} />
            <input
              id="af-email"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value })
                if (validationErrors.email) setValidationErrors({ ...validationErrors, email: "" })
              }}
              placeholder="you@example.com"
              className={inputClass}
              style={{ ...inputStyle, borderColor: validationErrors.email ? "#fecaca" : "#e5e7eb" }}
            />
          </div>
          {validationErrors.email && (
            <div className="mt-2 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
              <span className="text-sm" style={{ color: "#dc2626" }}>{validationErrors.email}</span>
            </div>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="af-phone" className="block text-base font-semibold" style={{ color: "#0f172a" }}>
            Phone <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <div className="relative mt-2">
            <Phone className="h-5 w-5" strokeWidth={1.8} style={iconStyle} />
            <input
              id="af-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => {
                const numbersOnly = e.target.value.replace(/\D/g, "")
                setForm({ ...form, phone: numbersOnly })
                if (validationErrors.phone) setValidationErrors({ ...validationErrors, phone: "" })
              }}
              placeholder="(555) 123-4567"
              className={inputClass}
              style={{ ...inputStyle, borderColor: validationErrors.phone ? "#fecaca" : "#e5e7eb" }}
            />
          </div>
          {validationErrors.phone && (
            <div className="mt-2 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
              <span className="text-sm" style={{ color: "#dc2626" }}>{validationErrors.phone}</span>
            </div>
          )}
        </div>

        {/* Audience */}
        <div>
          <label htmlFor="af-audience" className="block text-base font-semibold" style={{ color: "#0f172a" }}>
            Who will you refer?{" "}
            <span className="text-sm font-normal" style={{ color: "#64748b" }}>(Optional)</span>
          </label>
          <div className="relative mt-2">
            <Users className="h-5 w-5" strokeWidth={1.8} style={iconStyle} />
            <input
              id="af-audience"
              name="audience"
              type="text"
              value={form.audience}
              onChange={(e) => setForm({ ...form, audience: e.target.value })}
              placeholder="e.g. labs, research teams, colleagues"
              className={inputClass}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-3 rounded-full py-5 text-lg font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
        >
          {loading ? "Submitting..." : "Apply as a Referral Partner"}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>

        {error && (
          <div
            className="rounded-lg p-3 text-sm"
            style={{ backgroundColor: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca" }}
          >
            {error}
          </div>
        )}

        <p className="text-center text-sm leading-relaxed" style={{ color: "#64748b" }}>
          By applying, you agree to receive HappyTides referral partner updates.{" "}
          Research-use products only. Not for human or veterinary use.
        </p>
      </div>
    </form>
  )
}
