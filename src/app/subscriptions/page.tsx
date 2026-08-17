"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Check, Sparkles, Video } from "lucide-react";

export default function SubscriptionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

        {/* Main Scrollable Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto min-w-0">

          {/* Header Section */}
          <div className="flex flex-col items-center text-center my-8 mt-2">
            <div className="flex items-center gap-2 mb-3 bg-red-600/10 border border-red-500/20 px-4 py-1.5 rounded-full">
              <Video size={22} className="text-red-500" />
              <span className="text-sm font-semibold text-red-400 tracking-wide uppercase">
                YouTube Premium
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
              All YouTube, uninterrupted.
            </h1>
            <p className="text-zinc-400 max-w-lg text-sm lg:text-base">
              Get ad-free videos, background play, and offline downloads with YouTube Music Premium included.
            </p>
          </div>

          {/* Pricing Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto my-10 pb-12">

            {/* Monthly Plan */}
            <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all flex flex-col justify-between shadow-2xl">
              <div>
                <div className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-2">Individual</div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Monthly Plan
                </h2>
                <p className="text-xs text-zinc-400 mb-6">
                  Cancel anytime with 1-month free trial
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">
                    $13.99
                  </span>
                  <span className="text-zinc-400 text-sm">
                    / month
                  </span>
                </div>

                <ul className="space-y-3 border-t border-white/10 pt-6 text-sm text-zinc-300">
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-cyan-400 shrink-0" />
                    <span>
                      Ad-free & background play
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-cyan-400 shrink-0" />
                    <span>
                      Download videos for offline viewing
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-cyan-400 shrink-0" />
                    <span>
                      YouTube Music Premium included
                    </span>
                  </li>
                </ul>
              </div>

              <button className="mt-8 w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 font-semibold text-white transition active:scale-[0.98] cursor-pointer">
                Get Monthly Plan
              </button>
            </div>

            {/* Annual Plan (Highlighted) */}
            <div className="relative p-8 rounded-3xl bg-linear-to-b from-indigo-900/20 to-white/5 border border-indigo-500/40 backdrop-blur-xl hover:border-indigo-500/60 transition-all flex flex-col justify-between shadow-2xl">

              {/* Best Value Badge */}
              <div className="absolute -top-3.5 right-6 bg-linear-to-r from-indigo-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Sparkles size={13} />
                BEST VALUE
              </div>

              <div>
                <div className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                  Save 15%
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Annual Plan
                </h2>
                <p className="text-xs text-zinc-400 mb-6">
                  Prepaid 12-month subscription
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">
                    $139.99
                  </span>
                  <span className="text-zinc-400 text-sm">
                    / year
                  </span>
                </div>

                <ul className="space-y-3 border-t border-white/10 pt-6 text-sm text-zinc-300">
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-indigo-400 shrink-0" />
                    <span>
                      Save over 15% compared to monthly
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-indigo-400 shrink-0" />
                    <span>
                      Ad-free & background play for 1 year
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-indigo-400 shrink-0" />
                    <span>
                      Download videos for offline viewing
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={18} className="text-indigo-400 shrink-0" />
                    <span>
                      YouTube Music Premium included
                    </span>
                  </li>
                </ul>
              </div>

              <button className="mt-8 w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 font-semibold text-white transition active:scale-[0.98] shadow-lg shadow-indigo-500/25 cursor-pointer">
                Get Annual Plan
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}