"use client";

import React, { useState, useEffect } from "react";

interface Appointment {
  id: number;
  doctor_id: number;
  patient_name: string;
  email: string;
  date_time: string;
}

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [form, setForm] = useState({
    doctor_id: "",
    patient_name: "",
    email: "",
    date_time: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch appointments from the backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/appointments", { method: "GET" });
        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Handle form submission to create a new appointment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          doctor_id: Number(form.doctor_id), // Ensure doctor_id is a number
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Appointment created successfully!");
        setAppointments([
          ...appointments,
          {
            id: data.appointmentId,
            doctor_id: Number(form.doctor_id), // Ensure the correct type
            patient_name: form.patient_name,
            email: form.email,
            date_time: form.date_time,
          },
        ]);
        setForm({
          doctor_id: "",
          patient_name: "",
          email: "",
          date_time: "",
        });
      } else {
        alert(data.error || "Failed to create appointment.");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("An error occurred while creating the appointment.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>

      {/* Form to create a new appointment */}
      <form className="mb-6 p-4 border rounded-md" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4">Book a New Appointment</h2>

        <label className="block mb-2">
          Doctor ID:
          <input
            type="text"
            name="doctor_id"
            value={form.doctor_id}
            onChange={handleChange}
            required
            className="block w-full p-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          Patient Name:
          <input
            type="text"
            name="patient_name"
            value={form.patient_name}
            onChange={handleChange}
            required
            className="block w-full p-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="block w-full p-2 border rounded-md"
          />
        </label>

        <label className="block mb-2">
          Date/Time:
          <input
            type="datetime-local"
            name="date_time"
            value={form.date_time}
            onChange={handleChange}
            required
            className="block w-full p-2 border rounded-md"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>

      {/* List of appointments */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="p-4 border rounded-md">
                <p>
                  <strong>Doctor ID:</strong> {appointment.doctor_id}
                </p>
                <p>
                  <strong>Patient Name:</strong> {appointment.patient_name}
                </p>
                <p>
                  <strong>Email:</strong> {appointment.email}
                </p>
                <p>
                  <strong>Date/Time:</strong> {new Date(appointment.date_time).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
