import { NextRequest, NextResponse } from "next/server";

// In a real application, you would verify credentials against a database
// For this example, we'll use environment variables for admin credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@dallfi.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Simple authentication check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate a simple token (in production, use JWT or similar)
      const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");
      
      return NextResponse.json({
        success: true,
        token,
        message: "Login successful"
      });
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}