"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getVideoById, getVideos } from "@/services/api";
import { Video } from "@/services/api"; // Use this everywhere
import VideoCard from "@/components/VideoCard";
import Header from "@/components/Header";
import SidebarDrawer from "@/components/SidebarDrawer";
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
}

function WatchContent() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get("v");

  const [video, setVideo] = useState<Video | null>(null);
  const [related, setRelated] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  // Interactive States
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(1240);

  // Comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Alex Rivers",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      text: "This tutorial explained everything so clearly! Thanks for sharing 🔥",
      time: "2 hours ago",
      likes: 14,
    },
    {
      id: "2",
      author: "Tech Explorer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech",
      text: "Awesome clone project! The dark mode styling is spot on.",
      time: "1 day ago",
      likes: 8,
    },
  ]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!videoId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const current = await getVideoById(videoId);
      const all = await getVideos();

      setVideo(current);
      setRelated(all.filter((v) => String(v.id) !== String(videoId)));
      setLoading(false);
    }
    loadData();
  }, [videoId]);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      if (disliked) setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      if (liked) {
        setLiked(false);
        setLikesCount((prev) => prev - 1);
      }
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added: Comment = {
      id: Date.now().toString(),
      author: "You",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      text: newComment.trim(),
      time: "Just now",
      likes: 0,
    };

    setComments([added, ...comments]);
    setNewComment("");
  };

  if (loading) {
    return (
      <div className="p-6 max-w-[1700px] mx-auto w-full animate-pulse">
        <div className="aspect-video w-full bg-zinc-800 rounded-2xl mb-4" />
        <div className="h-6 bg-zinc-800 rounded w-2/3 mb-2" />
        <div className="h-4 bg-zinc-800 rounded w-1/3" />
      </div>
    );
  }

  if (!video) {
    return <div className="p-8 text-center text-zinc-400">Video not found.</div>;
  }

  return (
    <div className="p-4 lg:p-6 max-w-[1700px] mx-auto w-full flex flex-col lg:flex-row gap-6 pb-24">
      {/* Primary Video Player & Details */}
      <div className="flex-1 min-w-0">
        <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl">
          <video src={video.videoUrl} controls autoPlay className="w-full h-full object-cover" />
        </div>

        <h1 className="text-xl font-bold mt-4 text-white leading-snug">{video.title}</h1>

        {/* Channel Details & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <img
              src={video.channelAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=YouTube"}
              alt={video.channelName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-sm text-white">{video.channelName}</h3>
              <p className="text-xs text-zinc-400">120K subscribers</p>
            </div>
            <button
              onClick={() => setIsSubscribed(!isSubscribed)}
              className={`ml-3 font-semibold text-sm px-4 py-2 rounded-full cursor-pointer transition ${
                isSubscribed
                  ? "bg-zinc-800 text-white hover:bg-zinc-700"
                  : "bg-white text-black hover:bg-zinc-200"
              }`}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-sm">
            <div className="flex items-center bg-zinc-800 rounded-full">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 rounded-l-full border-r border-zinc-700 cursor-pointer ${
                  liked ? "text-blue-400 font-bold" : ""
                }`}
              >
                <ThumbsUp className="w-4 h-4" /> {likesCount}
              </button>
              <button
                onClick={handleDislike}
                className={`px-3 py-2 hover:bg-zinc-700 rounded-r-full cursor-pointer ${
                  disliked ? "text-red-400" : ""
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
            <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full cursor-pointer">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-full cursor-pointer">
              <Download className="w-4 h-4" /> Download
            </button>
            <button className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full cursor-pointer">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Description Box */}
        <div className="bg-zinc-800/60 hover:bg-zinc-800/80 p-4 rounded-2xl mt-4 text-sm transition">
          <div className="font-bold text-white mb-1 space-x-2">
            <span>{video.views}</span>
            <span>•</span>
            <span>{video.postedAt}</span>
          </div>
          <p className="whitespace-pre-line text-zinc-300 leading-relaxed">{video.description}</p>
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">{comments.length} Comments</h2>

          {/* Add Comment Input */}
          <form onSubmit={handleAddComment} className="flex gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm">
              N
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full bg-transparent border-b border-zinc-700 focus:border-white outline-none text-sm py-1"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-1 bg-white text-black font-semibold rounded-full disabled:opacity-50 text-sm hover:bg-zinc-200 transition"
              >
                Comment
              </button>
            </div>
          </form>

          {/* Comment List */}
          <div className="space-y-4">
            {comments.map((item) => (
              <div key={item.id} className="flex gap-3 text-sm">
                <img src={item.avatar} alt={item.author} className="w-8 h-8 rounded-full" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-zinc-300">{item.author}</span>
                    <span className="text-xs text-zinc-500">{item.time}</span>
                  </div>
                  <p className="mt-1 text-zinc-200">{item.text}</p>
                  <div className="flex items-center gap-4 mt-2 text-zinc-400 text-xs">
                    <button className="flex items-center gap-1 hover:text-white">
                      <ThumbsUp className="w-3.5 h-3.5" /> {item.likes || ""}
                    </button>
                    <button className="hover:text-white">
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                    <button className="font-medium hover:text-white">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Videos Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-3 shrink-0">
        <h2 className="font-bold text-lg text-white">Related Videos</h2>
        {related.map((item) => (
          <VideoCard key={item.id} video={item} />
        ))}
      </div>
    </div>
  );
}

export default function WatchPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen w-full">
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-50 w-full bg-[#0f0f0f]">
        <Header
          onToggleSidebar={() => setDrawerOpen(!drawerOpen)}
          onSearch={(query) => console.log(query)}
        />
      </div>

      <SidebarDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Main Direct Pinned Scroll Engine */}
      <main
        className="w-full transition-all duration-300 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40"
        style={{
          height: "calc(100vh - 64px)",
          overflowY: "scroll",
        }}
      >
        <Suspense fallback={<div className="p-6 text-zinc-400">Loading watch view...</div>}>
          <WatchContent />
        </Suspense>
      </main>
    </div>
  );
}