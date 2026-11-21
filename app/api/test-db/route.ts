import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) FROM users"
    );

    return NextResponse.json({
      message: "Database connection works!",
      userCount: result.rows[0].count,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Database connection failed.",
      },
      { status: 500 }
    );
  }
}