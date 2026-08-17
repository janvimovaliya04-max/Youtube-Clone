"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Copy, Check, X, MessageCircle, Mail } from "lucide-react";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl?: string;
    videoTitle?: string;
}

export default function ShareModal({
    isOpen,
    onClose,
    videoUrl,
    videoTitle = "Check out this video!",
}: ShareModalProps) {
    const [copied, setCopied] = useState(false);
    const [shareableUrl, setShareableUrl] = useState("");
    const [mounted, setMounted] = useState(false);

    // Ensure component is mounted on client side before using Portal & window
    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            setShareableUrl(videoUrl || window.location.href);
        }
    }, [videoUrl, isOpen]);

    // If modal is closed or not mounted yet, render nothing
    if (!isOpen || !mounted) return null;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareableUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    const encodedUrl = encodeURIComponent(shareableUrl);
    const encodedText = encodeURIComponent(videoTitle);

    const socialPlatforms = [
        {
            name: "WhatsApp",
            icon: <MessageCircle size={22} className="text-emerald-400" />,
            url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
            bg: "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20",
        },
        {
            name: "Email",
            icon: <Mail size={22} className="text-amber-400" />,
            url: `mailto:?subject=${encodedText}&body=${encodedUrl}`,
            bg: "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/20",
        },
    ];

    // Render Portal directly to body to bypass any container parent overflow issues
    return createPortal(
        <div
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md bg-[#121214] border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col gap-5 text-white relative z-[1000000]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-lg font-bold">Share Video</h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Options / Social Platforms */}
                <div className="grid grid-cols-2 gap-3">
                    {socialPlatforms.map((platform) => (
                        <a
                            key={platform.name}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center gap-3 p-3.5 rounded-2xl border transition-all duration-200 ${platform.bg}`}
                        >
                            {platform.icon}
                            <span className="text-sm font-medium text-zinc-200">
                                {platform.name}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Copy Link Input Section */}
                <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-2 gap-2">
                    <input
                        type="text"
                        readOnly
                        value={shareableUrl}
                        className="w-full bg-transparent px-3 text-xs text-zinc-300 outline-none truncate"
                    />
                    <button
                        onClick={handleCopyLink}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${copied
                                ? "bg-emerald-500 text-black font-bold"
                                : "bg-white hover:bg-zinc-200 text-black"
                            }`}
                    >
                        {copied ? (
                            <>
                                <Check size={16} />
                                <span>Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={16} />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}