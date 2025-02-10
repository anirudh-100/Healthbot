import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Whatthefuck@27", // Secure this in `.env`
  database: "healthbot",
});

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email } = await req.json();

    if (!name || !phone || !email) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Update user in MySQL
    await pool.execute("UPDATE users SET name = ?, phone = ? WHERE email = ?", [name, phone, email]);

    return NextResponse.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
