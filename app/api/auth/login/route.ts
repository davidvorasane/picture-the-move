import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import {
  createSession,
  setSessionCookie,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Please enter your email and password.",
        },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `SELECT id, full_name, email, password_hash
       FROM users
       WHERE email = $1
       LIMIT 1`,
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          error: "Email or password is incorrect.",
        },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return NextResponse.json(
        {
          error: "Email or password is incorrect.",
        },
        { status: 401 }
      );
    }

    const { token, expiresAt } =
      await createSession(user.id);

    const response = NextResponse.json({
      success: true,
    });

    setSessionCookie(
      response,
      token,
      expiresAt
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}