"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Video,
  Home,
  Compass,
  Tv,
  History,
  ThumbsUp,
  Bell,
  Trash2
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggleSidebar?: () => void;
}

export default function Sidebar({ isOpen, onToggleSidebar }: SidebarProps) {
  const pathname = usePathname();

  const mainLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Subscriptions", href: "/subscriptions", icon: Tv },
    { name: "History", href: "/history", icon: History },
    { name: "Liked", href: "/liked", icon: ThumbsUp },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Trash", href: "/trash", icon: Trash2 }
  ];

  return (
    <aside
      className={`bg-[#0a0a0c]/80 backdrop-blur-xl border-r border-white/10 flex flex-col gap-6 select-none shrink-0 h-full overflow-y-auto transition-all duration-300 ${isOpen ? "w-64 p-4" : "w-20 p-3 items-center"
        }`}
    >
      {/* 🚀 TOP BRAND & MENU SECTION */}
      <div
        className={`flex items-center w-full ${isOpen ? "justify-between px-1 py-1" : "flex-col gap-3 justify-center"
          }`}
      >


        {/* Brand Logo & Name (Only visible when open) */}
        {isOpen && (
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-red-600 p-2 rounded-xl shadow-lg shadow-red-600/30">
              <Video size={18} className="text-white fill-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-linear-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              YouTube
            </span>
          </Link>
        )}

        {/* Hamburger Menu Button */}
        <button
          onClick={onToggleSidebar}
          className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 text-white transition-all duration-300 cursor-pointer"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* MAIN NAVIGATION SECTION */}
      <div className="flex flex-col gap-1 w-full">
        {mainLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              title={!isOpen ? link.name : undefined} // Tooltip when collapsed
              className={`flex items-center gap-4 rounded-2xl text-sm font-medium transition-all ${isOpen ? "px-4 py-3 justify-start" : "p-3 justify-center"
                } ${isActive
                  ? "bg-white/10 text-white font-semibold border border-white/20 shadow-md"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
            >
              <Icon size={20} className={isActive ? "text-cyan-400" : ""} />
              {/* Text label show/hide based on isOpen */}
              {isOpen && <span className="truncate">{link.name}</span>}
            </Link>
          );
        })}
      </div>

      {isOpen && <hr className="border-white/10" />}
    </aside>
  );
}