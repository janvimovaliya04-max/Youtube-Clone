"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function NotificationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const notifications = [
    { id: 1, title: "New Video Uploaded", desc: "CodeWithHarry uploaded 'Next.js 15 Full Course'", time: "2 hours ago" },
    { id: 2, title: "Live Stream Alert", desc: "Fireship is going live with '10 Tech Trends'", time: "5 hours ago" },
    { id: 3, title: "New Comment Reply", desc: "User @dev_guy replied to your comment", time: "1 day ago" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onSearch={() => {}} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />

        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden min-w-0">
          <h1 className="text-2xl font-bold mb-6 text-white/90">💬 Notifications</h1>

          <div className="space-y-3 max-w-2xl">
            {notifications.map((item) => (
              <div 
                key={item.id} 
                className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex justify-between items-center hover:bg-white/10 transition"
              >
                <div>
                  <h3 className="font-semibold text-white/90">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </div>
                <span className="text-xs text-zinc-500">{item.time}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}