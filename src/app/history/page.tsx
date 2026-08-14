"use client";

import { useEffect, useState } from "react";
import { getVideos, Video } from "@/services/api";
import VideoCard from "@/components/VideoCard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { History } from "lucide-react";

export default function HistoryPage() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        async function loadData() {
            const data = await getVideos();
            // Simulating recently watched videos
            setVideos(data.slice(0, 3));
            setLoading(false);
        }
        loadData();
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col">
            <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onSearch={() => { }} />

            <div className="flex flex-1">
                <Sidebar isOpen={sidebarOpen} />

                <main className="flex-1 p-4 lg:p-6 overflow-x-hidden min-w-0">

                    <div className="flex flex-row items-center gap-2 mb-6">
                        <History size={25} />
                        <span className="text-lg font-bold text-white whitespace-nowrap">
                            Watch History
                        </span>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="aspect-video bg-white/5 animate-pulse rounded-2xl border border-white/10" />
                            ))}
                        </div>
                    ) : videos.length === 0 ? (
                        <div className="p-8 text-center bg-white/5 rounded-2xl border border-white/10 text-zinc-400">
                            No watch history found.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {videos.map((video) => (
                                <VideoCard key={video.id} video={video} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}