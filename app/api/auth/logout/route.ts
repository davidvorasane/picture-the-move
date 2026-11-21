import { createHash } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

const SESSION_COOKIE_NAME = "ptm_session";

function hashSessionToken(token: string) {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

export async function POST() {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (token) {
      const tokenHash = hashSessionToken(token);

      await pool.query(
        "DELETE FROM sessions WHERE token_hash = $1",
        [tokenHash]
      );
    }

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.delete(SESSION_COOKIE_NAME);

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      {
        error: "Unable to log out.",
      },
      { status: 500 }
    );
  }
}