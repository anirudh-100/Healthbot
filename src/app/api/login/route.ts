import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Create MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Whatthefuck@27", // Secure this in `.env`
  database: "healthbot",
});

const SECRET_KEY = "your_secret_key"; // Store this in `.env`

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Fetch user from the database
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    const user = (rows as any[])[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
