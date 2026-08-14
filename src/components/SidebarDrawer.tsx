"use client";

import Link from "next/link";
import { Menu, Home, Compass, PlaySquare, Clock, ThumbsUp, Flame, Music2, Gamepad2, Film, Radio, X } from "lucide-react";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarDrawer({ isOpen, onClose }: SidebarDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dark backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 transition-opacity" 
        onClick={onClose} 
      />

      {/* Sliding Drawer */}
      <aside className="relative z-10 w-60 bg-[#0f0f0f] h-full p-3 text-white overflow-y-auto flex flex-col border-r border-zinc-800 shadow-2xl">
        {/* Header inside drawer */}
        <div className="flex items-center gap-4 px-1 pb-3 mb-2 border-b border-zinc-800">
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-zinc-800 rounded-full text-white cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" onClick={onClose} className="flex items-center gap-1 cursor-pointer">
            <div className="bg-red-600 text-white flex items-center justify-center w-7 h-5 rounded-md font-bold text-[10px]">
              ▶
            </div>
            <span className="text-lg font-bold tracking-tighter text-white">YouTube</span>
          </Link>
        </div>

        {/* Links */}
        <div className="space-y-1 pb-4 border-b border-zinc-800">
          <Link href="/" onClick={onClose} className="flex items-center gap-5 px-3 py-2 rounded-xl bg-zinc-800 font-medium text-sm">
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link href="/" onClick={onClose} className="flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-zinc-800/60 text-sm">
            <Compass className="w-5 h-5" /> Shorts
          </Link>
          <Link href="/" onClick={onClose} className="flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-zinc-800/60 text-sm">
            <PlaySquare className="w-5 h-5" /> Subscriptions
          </Link>
        </div>

        <div className="space-y-1 py-4 border-b border-zinc-800">
          <div className="px-3 text-sm font-semibold text-zinc-400 mb-2">You</div>
          <Link href="/" onClick={onClose} className="flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-zinc-800/60 text-sm">
            <Clock className="w-5 h-5" /> History
          </Link>
          <Link href="/" onClick={onClose} className="flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-zinc-800/60 text-sm">
            <ThumbsUp className="w-5 h-5" /> Liked videos
          </Link>
        </div>

        <div className="space-y-1 py-4">
          <div className="px-3 text-sm font-semibold text-zinc-400 mb-2">Explore</div>
          <Link href="/" onClick={onClose} className="flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-zinc-800/60 text-sm">
            <Flame className="w-5 h-5" /> Trending
          </Link>
          <Link href="/" onClick={onClose} className="flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-zinc-800/60 text-sm">
            <Music2 className="w-5 h-5" /> Music
          </Link>
          <Link href="/" onClick={onClose} className="flex items-center gap-5 px-3 py-2 rounded-xl hover:bg-zinc-800/60 text-sm">
            <Gamepad2 className="w-5 h-5" /> Gaming
          </Link>
        </div>
      </aside>
    </div>
  );
}