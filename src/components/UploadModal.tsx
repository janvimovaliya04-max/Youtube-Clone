"use client";

import React, { useState } from "react";
import { X, UploadCloud } from "lucide-react";
import { createVideo, Video } from "@/services/api";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVideoCreated?: (newVideo: Video) => void;
    onSuccess?: () => void;
}

export default function UploadModal({
    isOpen,
    onClose,
    onVideoCreated, // 👈 Fix: Corrected typo (d added at the end)
    onSuccess,
}: UploadModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        thumbnailUrl: "",
        channelName: "",
        category: "Coding",
        description: "",
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.thumbnailUrl || !formData.channelName) {
            alert("Please fill in required fields (Title, Thumbnail URL, Channel Name)");
            return;
        }

        setLoading(true);

        const newVideoPayload = {
            ...formData,
            views: "0",
            uploadedAt: "Just now",
            duration: "10:00",
            avatarUrl: `https://i.pravatar.cc/150?u=${Date.now()}`,
        };

        const createdVideo = await createVideo(newVideoPayload);

        setLoading(false);

        if (createdVideo) {
            onVideoCreated?.(createdVideo);
            onSuccess?.(); // 👈 Fix: Added onSuccess call here
            onClose();
            // Reset form
            setFormData({
                title: "",
                thumbnailUrl: "",
                channelName: "",
                category: "Coding",
                description: "",
            });
        } else {
            alert("Failed to upload video. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#121217] border border-white/10 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <div className="flex items-center gap-2 text-cyan-400">
                        <UploadCloud size={24} />
                        <h2 className="text-lg font-bold text-white">Upload New Video</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs font-semibold text-zinc-400 uppercase">Title *</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Next.js 15 Full Crash Course"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-zinc-400 uppercase">Thumbnail URL *</label>
                        <input
                            type="url"
                            required
                            placeholder="https://picsum.photos/640/360"
                            value={formData.thumbnailUrl}
                            onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                            className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-zinc-400 uppercase">Channel Name *</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Tech With Dev"
                                value={formData.channelName}
                                onChange={(e) => setFormData({ ...formData, channelName: e.target.value })}
                                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-zinc-400 uppercase">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#1a1a22] border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                            >
                                <option value="Coding">Coding</option>
                                <option value="Design">Design</option>
                                <option value="Music">Music</option>
                                <option value="Gaming">Gaming</option>
                                <option value="Live">Live</option>
                                <option value="Podcasts">Podcasts</option>
                                <option value="Tech">Tech</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-zinc-400 uppercase">Description</label>
                        <textarea
                            rows={3}
                            placeholder="Enter video description..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-sm font-semibold transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "Uploading..." : "Publish Video"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}