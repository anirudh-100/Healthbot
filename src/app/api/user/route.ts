import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

// MySQL Connection
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Whatthefuck@27", // Secure this in `.env`
  database: "healthbot",
});

export async function GET(req: NextRequest) {
  try {
    // Example: Get user by email (Modify based on authentication method)
    const email = "johndoe@gmail.com"; // Replace this with JWT session auth

    const [user] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);

    if ((user as any[]).length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = (user as any[])[0];
    return NextResponse.json({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      avatar: userData.avatar || "/default-avatar.png",
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
