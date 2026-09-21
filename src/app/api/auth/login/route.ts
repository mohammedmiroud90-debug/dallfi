import { NextRequest, NextResponse } from "next/server";

const PARSE_SERVER_URL = process.env.PARSE_SERVER_URL ?? "";
const PARSE_APP_ID = process.env.PARSE_APP_ID ?? "";
const PARSE_JAVASCRIPT_KEY = process.env.PARSE_JAVASCRIPT_KEY ?? "";
const PARSE_MASTER_KEY = process.env.PARSE_MASTER_KEY ?? "";

const parseConfigured = Boolean(PARSE_SERVER_URL && PARSE_APP_ID && PARSE_JAVASCRIPT_KEY);

const headers = {
  "Content-Type": "application/json",
  "X-Parse-Application-Id": PARSE_APP_ID,
  "X-Parse-Javascript-Key": PARSE_JAVASCRIPT_KEY,
};

const adminWriteHeaders = PARSE_MASTER_KEY
  ? { ...headers, "X-Parse-Master-Key": PARSE_MASTER_KEY }
  : headers;

// Owner emails that always have admin access
const ownerEmails = new Set(
  [process.env.ADMIN_EMAIL, process.env.PARSE_ADMIN_EMAIL, process.env.ADMIN_EMAILS]
    .flatMap((value) => (value ?? "").split(/[,;\s]+/))
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
);

// Always allow the known owner account as a bootstrap fallback
ownerEmails.add("belhachemiamohammed@inbox.eu");

type ParseUser = {
  objectId?: string;
  sessionToken?: string;
  isAdmin?: unknown;
  admin?: unknown;
  role?: unknown;
  email?: string;
  username?: string;
};

function adminFlag(value: unknown) {
  return value === true || value === "true" || value === 1 || value === "1";
}

function isAdminUser(user: ParseUser, identity?: string) {
  if (adminFlag(user.isAdmin) || adminFlag(user.admin)) return true;
  const role = typeof user.role === "string" ? user.role.trim().toLowerCase() : "";
  if (role === "admin" || role === "administrator" || role === "owner") return true;
  const candidates = [user.email, user.username, identity]
    .map((value) => (value ?? "").trim().toLowerCase())
    .filter(Boolean);
  return candidates.some((value) => ownerEmails.has(value));
}

async function parseLogin(identity: string, password: string) {
  const response = await fetch(`${PARSE_SERVER_URL}/login`, {
    method: "POST",
    headers,
    cache: "no-store",
    body: JSON.stringify({ username: identity, password }),
  });
  if (response.ok) return response;
  // Some Parse setups store the login identity in email instead of username.
  return fetch(`${PARSE_SERVER_URL}/login`, {
    method: "POST",
    headers,
    cache: "no-store",
    body: JSON.stringify({ email: identity, password }),
  });
}

async function loadPrivilegedUser(user: ParseUser, sessionToken: string): Promise<ParseUser> {
  if (adminFlag(user.isAdmin) || adminFlag(user.admin)) return user;
  try {
    const response = await fetch(`${PARSE_SERVER_URL}/users/me`, {
      headers: { ...headers, "X-Parse-Session-Token": sessionToken },
      cache: "no-store",
    });
    if (!response.ok) return user;
    const full = (await response.json()) as ParseUser;
    return { ...user, ...full, sessionToken };
  } catch (error) {
    console.error("Parse privileged-user reload failed", error);
    return user;
  }
}

async function ensureAdminFlag(user: ParseUser) {
  if (!user.objectId || adminFlag(user.isAdmin) || !PARSE_MASTER_KEY) return;
  try {
    await fetch(`${PARSE_SERVER_URL}/classes/_User/${encodeURIComponent(user.objectId)}`, {
      method: "PUT",
      headers: adminWriteHeaders,
      body: JSON.stringify({ isAdmin: true }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Parse ensureAdminFlag failed", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!parseConfigured) {
      return NextResponse.json(
        { error: "Parse is not configured. Add the Parse values to environment variables first." },
        { status: 503 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const identity = email.trim().toLowerCase();

    // Try to login with Parse Server
    const response = await parseLogin(identity, password);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = (await response.json()) as ParseUser;
    if (!user.sessionToken) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Load full user data with session
    const privileged = await loadPrivilegedUser(user, user.sessionToken);
    if (!isAdminUser(privileged, identity)) {
      return NextResponse.json(
        {
          error: "This account does not have administrator access. In Parse Dashboard, set isAdmin to true on this _User, or set ADMIN_EMAIL in environment variables to this account's email.",
        },
        { status: 403 }
      );
    }

    // Ensure admin flag is set
    await ensureAdminFlag(privileged);

    // Return the Parse session token
    return NextResponse.json({
      success: true,
      token: user.sessionToken,
      message: "Login successful"
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}