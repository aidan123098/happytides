"use client"

import { useState } from "react"
import { ArrowRight, Check, Copy } from "lucide-react"

const CODE_REGEX = /^[a-zA-Z0-9]{0,20}$/

export function PartnerCodeForm() {
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [created, setCreated] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const previewCode = code.trim() || "YOURCODE"
  const referralLink = `happytides.com?utm_source=affiliate_marketing&code=${previewCode}`

  function handleCodeChange(value: string) {
    if (CODE_REGEX.test(value)) {
      setCode(value)
      if (error) setError("")
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const trimmed = code.trim()
    if (trimmed.length < 3) {
      setError("Code must be at least 3 characters.")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/partner-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: trimmed,
          full_name: name,
          email,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || "Failed to create partner account.")
        setLoading(false)
        return
      }
      setCreated(data.code)
      setLoading(false)
    } catch (err) {
      console.error("[v0] Partner code submission error:", err)
      setError("An error occurred. Please try again later.")
      setLoading(false)
    }
  }

  async function copyLink() {
    const link = `happytides.com?utm_source=affiliate_marketing&code=${created}`
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  if (created) {
    const finalLink = `happytides.com?utm_source=affiliate_marketing&code=${created}`
    return (
      <div
        className="rounded-3xl p-6"
        style={{
          border: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
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
        <p className="mt-2 text-center text-sm leading-relaxed" style={{ color: "#64748b" }}>
          Your partner code is{" "}
          <span className="font-semibold" style={{ color: "#0f172a" }}>
            {created}
          </span>
          . Share your referral link to start earning.
        </p>

        <div
          className="mt-6 rounded-2xl p-4"
          style={{ backgroundColor: "#eef2fb" }}
        >
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
            <>
              <Check className="h-5 w-5" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-5 w-5" /> Copy referral link
            </>
          )}
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
      <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#0f172a" }}>
        Create your partner account
      </h2>
      <p className="mt-2 text-base leading-relaxed" style={{ color: "#64748b" }}>
        Choose a unique code that your referrals will use
      </p>

      <div className="my-6 h-px w-full" style={{ backgroundColor: "#e5e7eb" }} />

      {/* Code field */}
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
          border: `1px solid ${error ? "#fecaca" : "#e5e7eb"}`,
          backgroundColor: "#f8f9fa",
          color: "#0f172a",
        }}
      />
      <p className="mt-2 text-sm" style={{ color: "#94a3b8" }}>
        3-20 characters, letters and numbers only
      </p>

      {/* Referral link preview */}
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

      {error && (
        <div
          className="mt-4 rounded-lg p-3 text-sm"
          style={{ backgroundColor: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca" }}
        >
          {error}
        </div>
      )}

      {/* Submit */}
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
