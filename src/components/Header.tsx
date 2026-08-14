"use client";

import React, { useState } from "react";
import { Menu, Search, Bell, User, Video, Mic, Plus } from "lucide-react";
import Link from "next/link";
import UploadModal from "@/components/UploadModal"; // 👈 1. UploadModal Import karyo

interface HeaderProps {
  onToggleSidebar: () => void;
  onSearch: (query: string) => void;
  onVideoCreated?: () => void; // 👈 Optional: Upload thaya pachhi list refresh karva
}

export default function Header({ onToggleSidebar, onSearch, onVideoCreated }: HeaderProps) {
  const [query, setQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false); // 👈 2. Modal state add kari

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full p-3 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left Section: Menu & Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 text-white transition-all duration-300 cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-red-600 p-2 rounded-xl shadow-lg shadow-red-600/30">
                <Video size={18} className="text-white fill-white" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-linear-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent hidden sm:inline">
                YouTube
              </span>
            </Link>
          </div>

          {/* Center Section: Glassmorphic Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-2xl flex items-center gap-2"
          >
            <div className="relative w-full flex items-center">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <Search size={18} />
              </button>
            </div>
            <button
              type="button"
              className="hidden sm:flex p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 text-white transition-all duration-300 cursor-pointer"
            >
              <Mic size={18} />
            </button>
          </form>

          {/* Right Section: Actions & Profile */}
          <div className="flex items-center gap-3 relative">
            {/* 🟢 CREATE / UPLOAD BUTTON */}
            <button
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/20 text-white font-medium text-sm transition-all duration-300 cursor-pointer shadow-lg hover:scale-105"
            >
              <Plus size={18} className="text-cyan-400" />
              <span className="hidden sm:inline">Create</span>
            </button>

            {/* Profile Dropdown Toggle */}
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-2 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-all duration-300 cursor-pointer"
            >
              <User size={20} />
            </button>

            {/* Glassmorphic Profile Modal */}
            {isProfileOpen && (
              <div className="absolute right-0 top-12 w-56 bg-zinc-900/80 backdrop-blur-2xl border border-white/15 p-4 rounded-3xl shadow-2xl flex flex-col gap-3 z-50">
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                  <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white">
                    U
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">User Name</p>
                    <p className="text-xs text-zinc-400">user@dev.com</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-sm text-zinc-300">
                  <button className="text-left px-3 py-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                    Your Channel
                  </button>
                  <button className="text-left px-3 py-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                    Settings
                  </button>
                  <button className="text-left px-3 py-2 rounded-xl hover:bg-white/10 text-red-400 transition-colors cursor-pointer">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 🔴 3. UPLOAD MODAL INTEGRATED */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={() => {
          setIsUploadOpen(false);
          onVideoCreated?.();
        }}
      />
    </>
  );
}