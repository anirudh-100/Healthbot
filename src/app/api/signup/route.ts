import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

// Create MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Whatthefuck@27", // Secure this in `.env`
  database: "healthbot",
});

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Check if the user already exists
    const [existingUser] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);

    if ((existingUser as any[]).length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const [result] = await pool.execute(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      userId: (result as mysql.ResultSetHeader).insertId,
    });
  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}
