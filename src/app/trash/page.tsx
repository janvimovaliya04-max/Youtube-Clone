"use client";

import { useEffect, useState } from "react";
import { Video, createVideo } from "@/services/api"; // 👈 createVideo ya addVideo import karo
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
    getTrashVideos,
    restoreFromTrash,
    permanentDeleteFromTrash,
} from "@/utils/trash";
import { Trash2, RotateCcw } from "lucide-react";

export default function TrashPage() {
    const [trashVideos, setTrashVideos] = useState<Video[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        setTrashVideos(getTrashVideos());
    }, []);

    const handleRestore = async (id: string) => {
        // 1. LocalStorage trash mathi video melvo
        const restoredVideo = restoreFromTrash(id);

        if (restoredVideo) {
            // 2. MockAPI / Main Store ma paacho add karo
            try {
                await createVideo(restoredVideo); // Tamaro backend / API create function
            } catch (err) {
                console.log("Error restoring to API, local restore done.");
            }

            // 3. Trash state update karo
            setTrashVideos(getTrashVideos());
            alert(`"${restoredVideo.title}" restored successfully! Go to Home page.`);
        }
    };

    const handlePermanentDelete = (id: string) => {
        if (confirm("Are you sure you want to permanently delete this video?")) {
            permanentDeleteFromTrash(id);
            setTrashVideos(getTrashVideos());
        }
    };

    return (
        <div className="h-screen bg-[#0a0a0c] text-white flex flex-col overflow-hidden">
            <Header
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                onSearch={() => { }}
            />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={sidebarOpen} />

                <main className="flex-1 p-4 lg:p-6 overflow-y-auto min-w-0 h-full">
                    <div className="flex flex-row items-center gap-2 mb-6">
                        <Trash2 className="text-red-400" size={28} />
                        <span className="text-lg font-bold text-white whitespace-nowrap">
                            Trash Bin
                        </span>
                    </div>

                    {trashVideos.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
                            <p className="text-zinc-400">Trash is empty.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-10">
                            {trashVideos.map((video) => (
                                <div
                                    key={video.id}
                                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-3 flex flex-col justify-between"
                                >
                                    <div>
                                        <img
                                            src={video.thumbnailUrl}
                                            alt={video.title}
                                            className="w-full aspect-video object-cover rounded-xl mb-3"
                                        />
                                        <h3 className="font-semibold text-sm line-clamp-2 text-zinc-100">
                                            {video.title}
                                        </h3>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 mt-4 pt-3 border-t border-white/10">
                                        <button
                                            onClick={() => handleRestore(video.id)}
                                            className="flex-1 flex items-center justify-center gap-2 bg-cyan-500/20 hover:bg-cyan-500 text-cyan-400 hover:text-black py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                                        >
                                            <RotateCcw size={14} /> Restore
                                        </button>
                                        <button
                                            onClick={() => handlePermanentDelete(video.id)}
                                            className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}