import React from "react";
import {
  Bar,
  Line,
  Pie,
} from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsSection = ({ analytics }: { analytics: any }) => {
  const barData = {
    labels: ["Orders", "Revenue", "Users", "Sessions"],
    datasets: [
      {
        label: "Performance",
        data: analytics ? analytics.data : [100, 200, 150, 300],
        backgroundColor: ["#6366F1", "#10B981", "#FACC15", "#EF4444"],
        borderRadius: 8,
      },
    ],
  };

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Logins",
        data: analytics ? analytics.logins : [10, 20, 15, 30, 25, 35, 40],
        borderColor: "#4F46E5",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Sessions",
        data: analytics ? analytics.sessions : [5, 15, 10, 20, 18, 25, 30],
        borderColor: "#10B981",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: ["Consultations", "Checkups", "Surgeries", "Follow-ups"],
    datasets: [
      {
        label: "Appointment Types",
        data: analytics ? analytics.appointments : [40, 30, 20, 10],
        backgroundColor: ["#EF4444", "#10B981", "#6366F1", "#FACC15"],
      },
    ],
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-4">📊 Analytics</h2>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Performance Overview</h3>
        <Bar data={barData} options={{ responsive: true }} />
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-2">User Activity Trends</h3>
        <Line data={lineData} options={{ responsive: true }} />
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Appointment Breakdown</h3>
        <Pie data={pieData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default AnalyticsSection;

