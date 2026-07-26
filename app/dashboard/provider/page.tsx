"use client";

import { MapPinned, CalendarCheck, DollarSign, Star } from "lucide-react";

const stats = [
  { label: "Active Listings", value: "0", icon: MapPinned, color: "text-blue-400 bg-blue-500/10" },
  { label: "Pending Bookings", value: "0", icon: CalendarCheck, color: "text-yellow-400 bg-yellow-500/10" },
  { label: "Total Revenue", value: "₹0", icon: DollarSign, color: "text-green-400 bg-green-500/10" },
  { label: "Avg. Rating", value: "--", icon: Star, color: "text-purple-400 bg-purple-500/10" },
];

export default function ProviderOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-th-text tracking-tight">Welcome back!</h1>
        <p className="text-sm text-th-text-muted mt-1">Here's what's happening with your adventures.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-th-card border border-th-border-subtle rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center shrink-0`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-th-text">{stat.value}</p>
              <p className="text-xs text-th-text-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-th-card border border-th-border-subtle rounded-2xl p-8 text-center text-th-text-muted">
        <p className="text-sm">Get started by creating your first adventure listing.</p>
      </div>
    </div>
  );
}