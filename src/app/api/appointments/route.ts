import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Create a connection pool for MySQL
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Whatthefuck@27", // Secure this in a `.env` file for production
  database: "healthbot",
});

// Create Appointment
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { doctor_id, patient_name, email, date_time } = await req.json();

    // Validate required fields
    if (!doctor_id || !patient_name || !email || !date_time) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // SQL query to insert appointment
    const query =
      "INSERT INTO appointments (doctor_id, patient_name, email, date_time) VALUES (?, ?, ?, ?)";
    
    // Use `ResultSetHeader` to type the result for access to `insertId`
    const [result] = await pool.execute<mysql.ResultSetHeader>(query, [
      doctor_id,
      patient_name,
      email,
      date_time,
    ]);

    // Return success response with the newly created appointment ID
    return NextResponse.json({
      success: true,
      appointmentId: result.insertId,
    });
  } catch (error: any) {
    console.error("Error creating appointment:", error);

    // Handle errors gracefully
    return NextResponse.json(
      { error: "Failed to create appointment", details: error.message },
      { status: 500 }
    );
  }
}
