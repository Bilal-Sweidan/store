'use client'
import { useState } from "react";
import { useSession } from "next-auth/react";


export default function DashboardHomePage() {
  const { data: session } = useSession()
  console.log(session)

  const [stats] = useState([
    { title: "Total Users", value: "1,245", change: "+12%" },
    { title: "Revenue", value: "$34,500", change: "+8.2%" },
    { title: "Orders", value: "389", change: "+5.4%" },
    { title: "Pending Tickets", value: "23", change: "-2.1%" },
  ]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back 👋 Here's what's happening today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
          />
          <button className="px-5 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition">
            + Add New
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500">
                {stat.title}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.change.includes("-")
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
                  }`}
              >
                {stat.change}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Revenue Overview
          </h3>
          <div className="h-64 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
            Chart Placeholder
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Recent Activity
          </h3>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between border-b border-slate-100 pb-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    New user registered
                  </p>
                  <p className="text-xs text-slate-400">2 mins ago</p>
                </div>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
