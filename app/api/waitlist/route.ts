import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract and validate required fields
    const { full_name, email, phone, affiliate_code } = body

    // Validation
    if (!full_name || typeof full_name !== "string" || !full_name.trim()) {
      return NextResponse.json(
        { error: "full_name is required and must be a non-empty string" },
        { status: 400 }
      )
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "email is required and must be a non-empty string" },
        { status: 400 }
      )
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { error: "phone is required and must be a non-empty string" },
        { status: 400 }
      )
    }

    // Normalize email to lowercase
    const normalizedEmail = email.trim().toLowerCase()

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Insert into waitlist table
    const { data, error } = await supabase.from("waitlist").insert([
      {
        full_name: full_name.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        affiliate_code: affiliate_code ? affiliate_code.trim() : null,
      },
    ])

    if (error) {
      console.error("[v0] Supabase insert error:", error)
      return NextResponse.json(
        { error: "Failed to add to waitlist. Please try again later." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully added to waitlist",
        data,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
