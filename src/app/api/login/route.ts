import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Whatthefuck@27",
  database: "healthbot",
});

const SECRET_KEY = "your_jwt_secret_key"; // Move to .env

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Check user
    const [users] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    const user = (users as any[])[0];
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "7d" });

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
