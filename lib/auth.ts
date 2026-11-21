import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

const SESSION_COOKIE_NAME = "ptm_session";

const SESSION_DURATION_MS =
  7 * 24 * 60 * 60 * 1000;

function hashSessionToken(token: string) {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

export async function createSession(userId: number) {
  const token = randomBytes(32).toString("hex");

  const tokenHash = hashSessionToken(token);

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_MS
  );

  await pool.query(
    `INSERT INTO sessions (
      user_id,
      token_hash,
      expires_at
    )
    VALUES ($1, $2, $3)`,
    [userId, tokenHash, expiresAt]
  );

  return {
    token,
    expiresAt,
  };
}

export function setSessionCookie(
  response: NextResponse,
  token: string,
  expiresAt: Date
) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const tokenHash = hashSessionToken(token);

  const result = await pool.query(
    `SELECT
      users.id,
      users.full_name,
      users.email
    FROM sessions
    INNER JOIN users
      ON users.id = sessions.user_id
    WHERE sessions.token_hash = $1
      AND sessions.expires_at > NOW()
    LIMIT 1`,
    [tokenHash]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return {
    id: result.rows[0].id,
    fullName: result.rows[0].full_name,
    email: result.rows[0].email,
  };
}