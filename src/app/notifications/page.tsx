"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const notifications = [
    { id: 1, title: "New Video Uploaded", desc: "CodeWithHarry uploaded 'Next.js 15 Full Course'", time: "2 hours ago" },
    { id: 2, title: "Live Stream Alert", desc: "Fireship is going live with '10 Tech Trends'", time: "5 hours ago" },
    { id: 3, title: "New Comment Reply", desc: "User @dev_guy replied to your comment", time: "1 day ago" },
    { id: 4, title: "Channel Milestone", desc: "Chill Vibes reached 100K Subscribers!", time: "1 day ago" },
    { id: 5, title: "New Video Uploaded", desc: "PixelRealm uploaded 'Unreal Engine 5.5 Showcase'", time: "2 days ago" },
    { id: 6, title: "Mention Alert", desc: "Chef Marco mentioned you in a comment", time: "2 days ago" },
    { id: 7, title: "New Video Uploaded", desc: "FitPulse uploaded 'Full Body HIIT Workout'", time: "3 days ago" },
    { id: 8, title: "Community Post", desc: "Wanderlust Asia posted a new poll: 'Where to travel next?'", time: "3 days ago" },
    { id: 9, title: "Live Stream Ended", desc: "UltraGaming 4K was live: 'Cyberpunk 2077 Ultra Graphics'", time: "4 days ago" },
    { id: 10, title: "New Video Uploaded", desc: "Tech Insights uploaded 'AI General Intelligence Reshaping Work'", time: "4 days ago" },
    { id: 11, title: "Comment Liked", desc: "@sarah_code liked your comment on 'Tailwind Tricks'", time: "5 days ago" },
    { id: 12, title: "New Video Uploaded", desc: "Six String Academy uploaded 'Fingerstyle Guitar Beginner Guide'", time: "5 days ago" },
    { id: 13, title: "New Subscriber", desc: "Alex Rivera subscribed to your channel", time: "6 days ago" },
    { id: 14, title: "New Video Uploaded", desc: "Minimal Nest uploaded '10 Desk Setup Ideas for Productivity'", time: "6 days ago" },
    { id: 15, title: "Community Post", desc: "CosmoLab shared an image: 'JWST Latest Deep Space Picture'", time: "1 week ago" },
    { id: 16, title: "New Video Uploaded", desc: "DesignVerse uploaded 'Figma Glassmorphism Masterclass'", time: "1 week ago" },
    { id: 17, title: "Live Stream Scheduled", desc: "FlavorTrails scheduled a stream for tomorrow: 'Mexico Street Food'", time: "1 week ago" },
    { id: 18, title: "New Comment Reply", desc: "ZenLife Yoga replied: 'Thank you for stretching with us!'", time: "1 week ago" },
    { id: 19, title: "New Video Uploaded", desc: "ChessMindset uploaded 'Grandmaster Chess Sacrifices & Attacks'", time: "1 week ago" },
    { id: 20, title: "New Video Uploaded", desc: "Sweet Treats Lab uploaded 'Fluffy Japanese Souffle Pancakes'", time: "2 weeks ago" },
    { id: 21, title: "Comment Liked", desc: "@dev_sam liked your comment: 'Great explaination of App Router!'", time: "2 weeks ago" },
    { id: 22, title: "New Video Uploaded", desc: "DevStack HQ uploaded 'Fullstack App with React & Node.js'", time: "2 weeks ago" },
    { id: 23, title: "New Video Uploaded", desc: "Acoustic Haven uploaded 'Indie Acoustic Songs for Rainy Days'", time: "2 weeks ago" },
    { id: 24, title: "Live Stream Alert", desc: "ProGaming Hub is live with 'E-Sports Finals Highlights'", time: "3 weeks ago" },
    { id: 25, title: "New Video Uploaded", desc: "Mountain Passages uploaded 'Himalayan High Altitude Trekking'", time: "3 weeks ago" },
    { id: 26, title: "New Comment Reply", desc: "User @react_fan replied to your comment on 'State Management'", time: "3 weeks ago" },
    { id: 27, title: "New Video Uploaded", desc: "BodyWeight Mastery uploaded '15 Min Calisthenics Routine'", time: "3 weeks ago" },
    { id: 28, title: "New Video Uploaded", desc: "RigCraft uploaded 'Custom Water-Cooled 4K Editing Beast PC'", time: "1 month ago" },
    { id: 29, title: "Community Post", desc: "Artistic Canvas posted a photo: 'Watercolor Landscape Practice'", time: "1 month ago" },
    { id: 30, title: "New Video Uploaded", desc: "Culinary Edge uploaded 'Knife Skills: Cut Like a Michelin Chef'", time: "1 month ago" },
    { id: 31, title: "New Subscriber", desc: "Sophia Chen subscribed to your channel", time: "1 month ago" },
    { id: 32, title: "New Video Uploaded", desc: "AutoFuture uploaded 'Top 10 EVs Releasing This Year'", time: "1 month ago" },
    { id: 33, title: "New Video Uploaded", desc: "Neon Nights uploaded 'Synthwave Cyberpunk Drive Mix'", time: "1 month ago" },
    { id: 34, title: "Comment Liked", desc: "@tech_lover liked your comment: 'Wi-Fi 7 speeds look crazy!'", time: "1 month ago" },
    { id: 35, title: "New Video Uploaded", desc: "Wilderness Survival uploaded '24 Hours Alone in Forest'", time: "2 months ago" }
  ];

  return (
    // 🚀 1. Main Outer Wrapper (Sidebar Left, Content Right)
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0a0c] text-white">

      {/* 🚀 2. LEFT SIDE: Full-Height Sidebar (Screen top to bottom) */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* 🚀 3. RIGHT SIDE: Header + Main Content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">

        {/* Header (Sidebar ni bajuma) */}
        <Header onSearch={() => { }} />

        {/* Main Scrollable Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto overflow-x-hidden min-w-0">

          <div className="flex flex-row items-center gap-2 mb-6">
            <Bell size={25} className="text-cyan-400" />
            <span className="text-lg font-bold text-white whitespace-nowrap">
              Notifications
            </span>
          </div>

          <div className="space-y-3 max-w-2xl pb-10">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex justify-between items-center hover:bg-white/10 transition"
              >
                <div>
                  <h3 className="font-semibold text-white/90">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </div>
                <span className="text-xs text-zinc-500 whitespace-nowrap ml-4">{item.time}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}