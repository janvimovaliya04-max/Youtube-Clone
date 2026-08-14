"use client";

import { useEffect, useState } from "react";
import { getVideos, deleteVideo, Video } from "@/services/api";
import VideoCard from "@/components/VideoCard";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CategoryPills from "@/components/CategoryPills";
import EditVideoModal from "@/components/EditVideoModal";

const categories = ["All", "Coding", "Design", "Music", "Gaming", "Live", "Podcasts", "Tech"];

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      const data = await getVideos();
      setVideos(data);
      setLoading(false);
    }
    fetchAll();
  }, []);

  const handleDeleteVideo = async (id: string) => {
    const success = await deleteVideo(id);
    if (success) {
      setVideos((prevVideos) => prevVideos.filter((v) => v.id !== id));
    } else {
      alert("Failed to delete video!");
    }
  };

  useEffect(() => {
    async function load() {
      const data = await getVideos();
      setVideos(data);
    }
    load();
  }, []);

  // 1. Edit Button Click Thava Par Call Thase
  const handleOpenEditModal = (video: Video) => {
    setEditingVideo(video);
    setIsEditModalOpen(true);
  };

  // 2. Modal Ma Save Thaya Pachhi State Update Thase (UI Refresh)
  const handleUpdateVideo = (updatedVideo: Video) => {
    setVideos((prevVideos) =>
      prevVideos.map((v) => (v.id === updatedVideo.id ? updatedVideo : v))
    );
  };

  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      selectedCategory === "All" ||
      video.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      searchQuery === "" ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channelName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#0a0a0c] text-white min-h-screen w-full">
      {/* 1. Header Sticky at Top */}
      <div className="sticky top-0 z-50 w-full bg-[#0a0a0c]">
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onSearch={(query) => setSearchQuery(query)}
        />
      </div>

      {/* 2. Main Body Container */}
      <div className="flex w-full pt-2">
        {/* Fixed Left Sidebar Wrapper */}
        <Sidebar isOpen={sidebarOpen} />

        {/* 3. Main Content Container - Directly Target Vertical Scroll */}
        <main
          className={`flex-1 min-w-0 p-4 lg:p-6 transition-all duration-300 ${sidebarOpen ? "ml-0" : ""
            }`}
          style={{
            height: "calc(100vh - 70px)",
            overflowY: "scroll",
          }}
        >
          {/* Category Chips */}
          <div className="mb-6">
            <CategoryPills
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
            />
          </div>

          {/* Videos Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="animate-pulse flex flex-col gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                >
                  <div className="aspect-video bg-white/10 rounded-xl" />
                  <div className="flex gap-3">
                    <div className="w-9 h-9 bg-white/10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-white/10 rounded w-5/6" />
                      <div className="h-3 bg-white/10 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="text-center py-20 text-zinc-400 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl">
              No videos found matching &quot;{searchQuery}&quot;.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-2 pb-24">
              {filteredVideos.map((video, idx) => (
                <VideoCard
                  key={video.id || idx}
                  video={video}
                  onDelete={handleDeleteVideo}
                  onEdit={(video) => handleOpenEditModal(video)}
                />
              ))}
            </div>
          )}

          {/* 🔴 Edit Modal Render */}
          {editingVideo && (
            <EditVideoModal
              video={editingVideo}
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onUpdate={handleUpdateVideo}
            />
          )}
        </main>
      </div>
    </div>
  );
}