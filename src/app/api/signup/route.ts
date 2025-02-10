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

const SECRET_KEY = "your_jwt_secret"; // Store this securely

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const [existingUser] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);

    if ((existingUser as any[]).length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      userId: (result as mysql.ResultSetHeader).insertId,
      token,
    });
  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}
