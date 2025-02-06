import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Whatthefuck@27",
  database: "healthbot",
});

// Doctor Registration API
export async function POST(req: NextRequest) {
  const { name, specialization, location, email, phone, available_slots } = await req.json();

  if (!name || !specialization || !location || !email || !phone) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const query = "INSERT INTO doctors (name, specialization, location, email, phone, available_slots) VALUES (?, ?, ?, ?, ?, ?)";
    
    const [result] = await pool.execute<mysql.ResultSetHeader>(query, [
      name,
      specialization,
      location,
      email,
      phone,
      JSON.stringify(available_slots) // Store available slots as JSON string
    ]);

    return NextResponse.json({ success: true, doctorId: result.insertId });
  } catch (error) {
    console.error("Error registering doctor:", error);
    return NextResponse.json({ error: "Failed to register doctor" }, { status: 500 });
  }
}
