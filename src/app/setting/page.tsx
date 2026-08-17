"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
    User,
    Bell,
    Shield,
    Palette,
    Camera,
    Save,
    Trash2,
    CheckCircle,
} from "lucide-react";

export default function SettingsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"profile" | "account" | "notifications" | "appearance">("profile");
    const [savedSuccess, setSavedSuccess] = useState(false);

    // Form States
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [autoplay, setAutoplay] = useState(true);
    const [emailNotify, setEmailNotify] = useState(true);
    const [theme, setTheme] = useState("dark");

    // 1. પેજ લોડ / રીફ્રેશ થાય ત્યારે LocalStorage માંથી Saved ડેટા ફેચ કરવો
    useEffect(() => {
        const savedName = localStorage.getItem("user_name");
        const savedEmail = localStorage.getItem("user_email");
        const savedBio = localStorage.getItem("user_bio");
        const savedAutoplay = localStorage.getItem("user_autoplay");
        const savedNotify = localStorage.getItem("user_notify");
        const savedTheme = localStorage.getItem("user_theme");

        // જો ડેટા હોય તો સેટ કરો, નહીંતર Default વેલ્યુ આપો
        setUsername(savedName || "User Name");
        setEmail(savedEmail || "user@example.com");
        setBio(savedBio || "Full-stack developer & UI designer enthusiast.");
        if (savedAutoplay !== null) setAutoplay(savedAutoplay === "true");
        if (savedNotify !== null) setEmailNotify(savedNotify === "true");
        if (savedTheme) setTheme(savedTheme);
    }, []);

    // 2. Save Changes ક્લિક થાય ત્યારે પરમેનન્ટ LocalStorage માં સેવ કરવું
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        // LocalStorage માં ડેટા સ્ટોર કરવો
        localStorage.setItem("user_name", username);
        localStorage.setItem("user_email", email);
        localStorage.setItem("user_bio", bio);
        localStorage.setItem("user_autoplay", String(autoplay));
        localStorage.setItem("user_notify", String(emailNotify));
        localStorage.setItem("user_theme", theme);

        // Header ને તુરંત અપડેટ કરવા ઈવેન્ટ ફાયર કરવી
        window.dispatchEvent(new Event("user-profile-updated"));

        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
    };

    return (
        // 🚀 1. Main Outer Wrapper (Sidebar Left, Content Right)
        <div className="flex h-screen w-screen overflow-hidden bg-[#0a0a0c] text-white">

            {/* 🚀 2. LEFT SIDE: Full-Height Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />

            {/* 🚀 3. RIGHT SIDE: Header + Main Content */}
            <div className="flex flex-col flex-1 h-full overflow-hidden">

                {/* Header */}
                <Header onSearch={() => { }} />

                {/* Settings Container */}
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto w-full min-w-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40">
                    <div className="max-w-5xl mx-auto pb-24">
                        {/* Header Title */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
                            <p className="text-sm text-zinc-400 mt-1">
                                Manage your channel preferences, profile settings, and account privacy.
                            </p>
                        </div>

                        {/* Layout Grid */}
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Navigation Tabs */}
                            <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 shrink-0 overflow-x-auto">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("profile")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === "profile"
                                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                                        : "bg-white/5 border border-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                                        }`}
                                >
                                    <User size={18} />
                                    <span>Profile Info</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setActiveTab("account")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === "account"
                                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                                        : "bg-white/5 border border-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                                        }`}
                                >
                                    <Shield size={18} />
                                    <span>Account & Privacy</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setActiveTab("notifications")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === "notifications"
                                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                                        : "bg-white/5 border border-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                                        }`}
                                >
                                    <Bell size={18} />
                                    <span>Notifications</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setActiveTab("appearance")}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === "appearance"
                                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                                        : "bg-white/5 border border-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                                        }`}
                                >
                                    <Palette size={18} />
                                    <span>Appearance</span>
                                </button>
                            </div>

                            {/* Main Tab Content */}
                            <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl">
                                {savedSuccess && (
                                    <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
                                        <CheckCircle size={18} />
                                        <span>Settings saved successfully!</span>
                                    </div>
                                )}

                                {/* --- TAB 1: PROFILE INFO --- */}
                                {activeTab === "profile" && (
                                    <form onSubmit={handleSave} className="space-y-6">
                                        <h2 className="text-xl font-bold">Profile Details</h2>

                                        <div className="flex items-center gap-6">
                                            <div className="relative group cursor-pointer">
                                                <div className="w-20 h-20 rounded-3xl bg-linear-to-tr from-cyan-500 to-indigo-500 text-white font-bold flex items-center justify-center text-2xl border-2 border-white/20 shadow-xl uppercase">
                                                    {username ? username[0] : "U"}
                                                </div>
                                                <div className="absolute inset-0 bg-black/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Camera size={20} className="text-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold cursor-pointer transition-colors"
                                                >
                                                    Change Avatar
                                                </button>
                                                <p className="text-xs text-zinc-500 mt-1">
                                                    Recommended size: 400x400px (JPG, PNG)
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-zinc-400 mb-2">
                                                    Display Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 focus:border-cyan-500 rounded-2xl px-4 py-3 text-sm text-white outline-none transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-zinc-400 mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 focus:border-cyan-500 rounded-2xl px-4 py-3 text-sm text-white outline-none transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-zinc-400 mb-2">
                                                    Channel Bio / Description
                                                </label>
                                                <textarea
                                                    rows={4}
                                                    value={bio}
                                                    onChange={(e) => setBio(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 focus:border-cyan-500 rounded-2xl px-4 py-3 text-sm text-white outline-none transition-all resize-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 flex justify-end">
                                            <button
                                                type="submit"
                                                className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                                            >
                                                <Save size={18} />
                                                <span>Save Changes</span>
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* --- TAB 2: ACCOUNT & PRIVACY --- */}
                                {activeTab === "account" && (
                                    <form onSubmit={handleSave} className="space-y-6">
                                        <h2 className="text-xl font-bold">Account & Security</h2>

                                        <div className="space-y-4">
                                            <div className="p-4 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-sm">Autoplay Next Video</h3>
                                                    <p className="text-xs text-zinc-400">
                                                        Automatically play recommended videos when current ends.
                                                    </p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={autoplay}
                                                    onChange={(e) => setAutoplay(e.target.checked)}
                                                    className="w-5 h-5 accent-cyan-500 cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 flex justify-end">
                                            <button
                                                type="submit"
                                                className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                                            >
                                                <Save size={18} />
                                                <span>Save Changes</span>
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* --- TAB 3: NOTIFICATIONS --- */}
                                {activeTab === "notifications" && (
                                    <form onSubmit={handleSave} className="space-y-6">
                                        <h2 className="text-xl font-bold">Notification Preferences</h2>

                                        <div className="space-y-4">
                                            <div className="p-4 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-sm">Email Notifications</h3>
                                                    <p className="text-xs text-zinc-400">
                                                        Receive emails about your account activity and new recommendations.
                                                    </p>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={emailNotify}
                                                    onChange={(e) => setEmailNotify(e.target.checked)}
                                                    className="w-5 h-5 accent-cyan-500 cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 flex justify-end">
                                            <button
                                                type="submit"
                                                className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                                            >
                                                <Save size={18} />
                                                <span>Save Changes</span>
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* --- TAB 4: APPEARANCE --- */}
                                {activeTab === "appearance" && (
                                    <form onSubmit={handleSave} className="space-y-6">
                                        <h2 className="text-xl font-bold">Theme & Style</h2>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div
                                                onClick={() => setTheme("dark")}
                                                className={`p-4 rounded-2xl border cursor-pointer transition-all ${theme === "dark"
                                                    ? "bg-cyan-500/10 border-cyan-500"
                                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                                                    }`}
                                            >
                                                <div className="h-20 bg-zinc-900 rounded-xl mb-3 border border-white/10 flex items-center justify-center text-xs text-zinc-400">
                                                    Dark Mode (Default)
                                                </div>
                                                <span className="text-sm font-semibold">Glassmorphic Dark</span>
                                            </div>

                                            <div
                                                onClick={() => setTheme("dim")}
                                                className={`p-4 rounded-2xl border cursor-pointer transition-all ${theme === "dim"
                                                    ? "bg-cyan-500/10 border-cyan-500"
                                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                                                    }`}
                                            >
                                                <div className="h-20 bg-zinc-800 rounded-xl mb-3 border border-white/10 flex items-center justify-center text-xs text-zinc-400">
                                                    Midnight Blue
                                                </div>
                                                <span className="text-sm font-semibold">Deep Midnight</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 flex justify-end">
                                            <button
                                                type="submit"
                                                className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                                            >
                                                <Save size={18} />
                                                <span>Save Changes</span>
                                            </button>
                                        </div>
                                    </form>
                                )}

                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}