"use client";

import { useEffect, useState, useRef } from "react";
import { getVideos, Video } from "@/services/api";
import VideoCard from "@/components/VideoCard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ExplorePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getVideos();
      setVideos(data);
      setFilteredVideos(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.6;
      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current && e.deltaY !== 0) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter(
        (v) => v.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredVideos(filtered);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      handleCategorySelect(activeCategory);
      return;
    }
    const searched = videos.filter((v) =>
      v.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVideos(searched);
  };

  return (
    <div className="h-screen bg-[#0a0a0c] text-white flex flex-col overflow-hidden">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onSearch={handleSearch}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />

        {/* 🟢 MAIN CONTAINER: overflow-y-auto added for card scrolling */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto min-w-0 h-full
                         [&::-webkit-scrollbar]:w-2
                         [&::-webkit-scrollbar-track]:bg-transparent
                         [&::-webkit-scrollbar-thumb]:bg-white/10
                         [&::-webkit-scrollbar-thumb]:rounded-full
                         hover:[&::-webkit-scrollbar-thumb]:bg-cyan-500/50">
          
          <h1 className="text-2xl font-bold mb-4 text-white/90">
            🔥 Trending & Explore
          </h1>

          {/* 🟡 CATEGORY FILTER STRIP */}
          <div className="relative flex items-center mb-6 group">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="absolute left-0 z-20 p-2 rounded-full bg-black/80 text-white border border-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500 hover:text-black cursor-pointer shadow-lg"
            >
              <ChevronLeft size={18} />
            </button>


            <button
              type="button"
              onClick={() => scroll("right")}
              className="absolute right-0 z-20 p-2 rounded-full bg-black/80 text-white border border-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500 hover:text-black cursor-pointer shadow-lg"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* 🔴 CARDS GRID (SKELETON & VIDEOS) */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-10">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="aspect-video bg-white/5 animate-pulse rounded-2xl border border-white/10"
                />
              ))}
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="text-center py-16 bg-white/5 border border-white/10 rounded-3xl">
              <p className="text-zinc-400">
                No videos found in "{activeCategory}" category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-10">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}