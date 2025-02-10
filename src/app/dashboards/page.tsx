"use client";

import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiUser, FiEdit, FiLogOut } from "react-icons/fi";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const queryClient = new QueryClient();

const fetchAnalytics = async () => {
  const { data } = await axios.get("/api/analytics");
  return data;
};

const fetchUserLocation = async (): Promise<{ latitude: number; longitude: number } | null> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => resolve(null)
      );
    }
  });
};

const AnalyticsSection = () => {
  const router = useRouter();
  const { data: analytics, isLoading } = useQuery({ queryKey: ["analytics"], queryFn: fetchAnalytics });
  const { data: location } = useQuery({ queryKey: ["userLocation"], queryFn: fetchUserLocation, staleTime: 1000 * 60 * 10 });

  const [filter, setFilter] = useState("weekly");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="p-6 flex flex-col gap-6 relative">
      {/* 🔹 Top Right Profile Icon */}
      <div className="absolute top-4 right-4">
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <FiUser size={28} className="text-gray-700 dark:text-gray-300" />
          
          {/* 🔹 Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2">
              <button
                onClick={() => router.push("/components/profilesection")}
                className="flex items-center w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <FiEdit className="mr-2" /> Edit Profile
              </button>
              <button
                onClick={() => alert("Logout Clicked")}
                className="flex items-center w-full px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">📊 Analytics</h2>

      {location ? (
        <p className="text-gray-700 dark:text-gray-300">
          📍 Your Location: {location.latitude}, {location.longitude}
        </p>
      ) : (
        <p className="text-gray-500">Fetching location...</p>
      )}

      <div className="flex gap-4">
        <button className={`px-4 py-2 rounded ${filter === "weekly" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setFilter("weekly")}>
          Weekly
        </button>
        <button className={`px-4 py-2 rounded ${filter === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setFilter("monthly")}>
          Monthly
        </button>
      </div>

      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Performance Overview</h3>
            <Bar data={{
              labels: ["Orders", "Revenue", "Users", "Sessions"],
              datasets: [{
                label: "Performance",
                data: analytics ? analytics.data : [100, 200, 150, 300],
                backgroundColor: ["#6366F1", "#10B981", "#FACC15", "#EF4444"],
                borderRadius: 8,
              }]
            }} options={{ responsive: true }} />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">User Activity Trends</h3>
            <Line data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [{
                label: "Daily Logins",
                data: analytics ? analytics.logins : [10, 20, 15, 30, 25, 35, 40],
                borderColor: "#4F46E5",
                fill: false,
                tension: 0.4,
              }]
            }} options={{ responsive: true }} />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Appointment Breakdown</h3>
            <Pie data={{
              labels: ["Consultations", "Checkups", "Surgeries", "Follow-ups"],
              datasets: [{
                label: "Appointment Types",
                data: analytics ? analytics.appointments : [40, 30, 20, 10],
                backgroundColor: ["#EF4444", "#10B981", "#6366F1", "#FACC15"],
              }]
            }} options={{ responsive: true }} />
          </div>
        </>
      )}
    </div>
  );
};

// Wrap Dashboard with QueryClientProvider
const Dashboard = () => (
  <QueryClientProvider client={queryClient}>
    <AnalyticsSection />
  </QueryClientProvider>
);

export default Dashboard;
