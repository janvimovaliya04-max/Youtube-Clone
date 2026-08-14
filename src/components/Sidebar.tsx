"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  History,
  ThumbsUp,
  Bell,
  Flame,
  Music2,
  Gamepad2,
  Trophy,
  Trash2
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();

  // Standard Main Links
  const mainLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "History", href: "/history", icon: History },
    { name: "Liked", href: "/liked", icon: ThumbsUp },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Trash", href: "/trash", icon: Trash2 }
  ];

  // 🟢 EXPLORE SECTION LINKS (Matching Your Image)
  const exploreLinks = [
    { name: "Trending", href: "/explore?category=Trending", icon: Flame },
    { name: "Music", href: "/explore?category=Music", icon: Music2 },
    { name: "Gaming", href: "/explore?category=Gaming", icon: Gamepad2 },
    { name: "Sports", href: "/explore?category=Sports", icon: Trophy },
  ];

  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-[#0a0a0c]/80 backdrop-blur-xl border-r border-white/10 p-4 flex flex-col gap-6 select-none shrink-0 h-[calc(100vh-64px)] overflow-y-auto">
      {/* 🔴 MAIN NAVIGATION SECTION */}
      <div className="flex flex-col gap-1">
        {mainLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-white/10 text-white font-semibold border border-white/20 shadow-md"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={20} className={isActive ? "text-cyan-400" : ""} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>

      <hr className="border-white/10" />

      {/* 🟡 EXPLORE SECTION (Exact Match with Image) */}
      <div className="flex flex-col gap-1">
        <h2 className="px-4 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
          EXPLORE
        </h2>

        {exploreLinks.map((link) => {
          const Icon = link.icon;
          // Check active state
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-white/10 text-white font-semibold border border-white/20 shadow-md"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={20} className={isActive ? "text-cyan-400" : ""} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}