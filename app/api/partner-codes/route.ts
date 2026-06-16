import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const CODE_REGEX = /^[a-zA-Z0-9]{3,20}$/

// GET /api/partner-codes?code=XYZ — validate whether a code exists
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")?.trim()

  if (!code) {
    return NextResponse.json({ valid: false, error: "No code provided." }, { status: 400 })
  }

  if (!CODE_REGEX.test(code)) {
    return NextResponse.json({ valid: false, error: "That doesn't look like a valid affiliate code." })
  }

  const { data, error } = await supabase
    .from("partner_codes")
    .select("id, code")
    .ilike("code", code)
    .maybeSingle()

  if (error) {
    console.error("[v0] Code lookup error:", error)
    return NextResponse.json({ valid: false, error: "Could not verify code." }, { status: 500 })
  }

  if (!data) {
    return NextResponse.json({ valid: false, error: "That affiliate code doesn't exist." })
  }

  return NextResponse.json({ valid: true, code: data.code })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, full_name, email, phone } = body

    if (!code || typeof code !== "string" || !code.trim()) {
      return NextResponse.json(
        { error: "Please choose a partner code." },
        { status: 400 }
      )
    }

    const normalizedCode = code.trim()

    if (!CODE_REGEX.test(normalizedCode)) {
      return NextResponse.json(
        { error: "Code must be 3-20 characters, letters and numbers only." },
        { status: 400 }
      )
    }

    // Check for existing code (case-insensitive)
    const { data: existing, error: lookupError } = await supabase
      .from("partner_codes")
      .select("id")
      .ilike("code", normalizedCode)
      .maybeSingle()

    if (lookupError) {
      console.error("[v0] Partner code lookup error:", lookupError)
      return NextResponse.json(
        { error: "Something went wrong. Please try again later." },
        { status: 500 }
      )
    }

    if (existing) {
      return NextResponse.json(
        { error: "That code is already taken. Please choose another." },
        { status: 409 }
      )
    }

    const normalizedEmail =
      email && typeof email === "string" ? email.trim().toLowerCase() : null

    const { data, error } = await supabase
      .from("partner_codes")
      .insert([
        {
          code: normalizedCode,
          full_name:
            full_name && typeof full_name === "string" ? full_name.trim() : null,
          email: normalizedEmail,
          phone: phone && typeof phone === "string" ? phone.trim() : null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("[v0] Partner code insert error:", error)
      // Unique violation fallback
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "That code is already taken. Please choose another." },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: "Failed to create partner account. Please try again later." },
        { status: 500 }
      )
    }

    // Also save to waitlist table to track all signups
    if (normalizedEmail) {
      const { error: waitlistError } = await supabase
        .from("waitlist")
        .insert([
          {
            full_name:
              full_name && typeof full_name === "string"
                ? full_name.trim()
                : null,
            email: normalizedEmail,
            phone: phone && typeof phone === "string" ? phone.trim() : null,
            affiliate_code: normalizedCode,
          },
        ])
        .select()
        .single()

      if (waitlistError) {
        console.error("[v0] Waitlist insert error (non-fatal):", waitlistError)
        // Non-fatal error — partner code was already created successfully
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Partner account created",
        code: data.code,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("[v0] Partner code API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
