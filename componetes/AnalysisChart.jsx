"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,        // ✅ REQUIRED for Pie
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,        // ✅ REGISTER HERE
  Tooltip,
  Legend
);

export default function AnalysisChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [120, 190, 300, 250, 220],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const pieData = {
    labels: ["Chrome", "Firefox", "Edge"],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <h2>Sales Analysis</h2>

      <Bar data={data} />

      <Line data={data} />

      <Pie data={pieData} />
    </div>
  );
}
