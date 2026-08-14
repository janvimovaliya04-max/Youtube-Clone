"use client";

import { useEffect, useState } from "react";
import { getVideos, Video } from "@/services/api";
import VideoCard from "@/components/VideoCard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function LikedPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getVideos();
      setVideos(data.slice(0, 2)); // Dynamic slice for liked mock
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onSearch={() => {}} />

      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />

        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden min-w-0">
          <h1 className="text-2xl font-bold mb-6 text-white/90">👍 Liked Videos</h1>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[1, 2].map((i) => (
                <div key={i} className="aspect-video bg-white/5 animate-pulse rounded-2xl border border-white/10" />
              ))}
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