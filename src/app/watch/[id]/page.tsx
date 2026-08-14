"use client";

import { useEffect, useState, use } from "react";
import VideoActions from "@/components/VideoActions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VideoCard from "@/components/VideoCard";
import { getVideos, Video } from "@/services/api";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  Bookmark,
  MessageSquare,
  Send,
} from "lucide-react";

interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export default function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const videoId = resolvedParams.id;

  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Like / Dislike State
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(12400);

  // Comments State
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function loadData() {
      const allVideos = await getVideos();
      const current =
        allVideos.find((v) => String(v.id) === videoId) || allVideos[0];
      setVideo(current);
      setRelatedVideos(allVideos.filter((v) => String(v.id) !== videoId));

      // Load Saved Likes from LocalStorage
      if (videoId) {
        const savedLikes = localStorage.getItem(`yt_like_${videoId}`);
        if (savedLikes) {
          const data = JSON.parse(savedLikes);
          setLiked(data.liked || false);
          setDisliked(data.disliked || false);
          setLikeCount(data.count || 12400);
        }

        // Load Saved Comments from LocalStorage
        const savedComments = localStorage.getItem(`yt_comments_${videoId}`);
        if (savedComments) {
          setComments(JSON.parse(savedComments));
        } else {
          const defaultComments: Comment[] = [
            {
              id: "1",
              author: "Alex Code",
              text: "Amazing explanation! Loved the glassmorphism design 🔥",
              createdAt: "2 hours ago",
            },
            {
              id: "2",
              author: "Dev Guy",
              text: "This Next.js setup is super smooth!",
              createdAt: "1 day ago",
            },
          ];
          setComments(defaultComments);
          localStorage.setItem(
            `yt_comments_${videoId}`,
            JSON.stringify(defaultComments)
          );
        }
      }
    }
    loadData();
  }, [videoId]);

  // Like Toggle Handler
  const handleLike = () => {
    let nextLiked = !liked;
    let nextDisliked = false;
    let nextCount = nextLiked ? likeCount + 1 : likeCount - 1;

    if (disliked) {
      setDisliked(false);
    }

    setLiked(nextLiked);
    setLikeCount(nextCount);

    localStorage.setItem(
      `yt_like_${videoId}`,
      JSON.stringify({ liked: nextLiked, disliked: nextDisliked, count: nextCount })
    );
  };

  // Dislike Toggle Handler
  const handleDislike = () => {
    let nextDisliked = !disliked;
    let nextLiked = false;
    let nextCount = liked ? likeCount - 1 : likeCount;

    setLiked(false);
    setDisliked(nextDisliked);
    setLikeCount(nextCount);

    localStorage.setItem(
      `yt_like_${videoId}`,
      JSON.stringify({ liked: nextLiked, disliked: nextDisliked, count: nextCount })
    );
  };

  // Add Comment Handler
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj: Comment = {
      id: Date.now().toString(),
      author: "You (Developer)",
      text: newComment,
      createdAt: "Just now",
    };

    const updated = [commentObj, ...comments];
    setComments(updated);
    localStorage.setItem(`yt_comments_${videoId}`, JSON.stringify(updated));
    setNewComment("");
  };

  if (!video) {
    return (
      <div className="h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black text-white flex items-center justify-center">
        <div className="animate-pulse font-medium text-zinc-400">
          Loading Video Player...
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black text-white flex flex-col overflow-hidden">
      {/* Sticky Header */}
      <div className="shrink-0 z-50">
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onSearch={() => {}}
        />
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={sidebarOpen} />

        {/* Scrollable Main View Engine */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto h-[calc(100vh-64px)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40">
          <div className="flex flex-col lg:flex-row gap-6 max-w-[1700px] mx-auto w-full pb-24">
            {/* Main Video Section */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              {/* Player Container */}
              <div className="aspect-video w-full rounded-3xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl relative shrink-0">
                <iframe
                  src={`https://www.youtube.com/embed/${
                    video.youtubeId || "dQw4w9WgXcQ"
                  }?autoplay=1`}
                  title={video.title}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Actions Component */}
              <VideoActions
                channelName={video.channelName}
                initialLikes={15200}
              />

              {/* Video Meta Info */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-4 shadow-xl">
                <h1 className="text-xl lg:text-2xl font-bold leading-tight">
                  {video.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Channel Details */}
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        video.avatarUrl ||
                        "https://picsum.photos/seed/user/100/100"
                      }
                      alt={video.channelName}
                      className="w-12 h-12 rounded-2xl object-cover border border-white/20"
                    />
                    <div>
                      <h2 className="font-semibold text-lg leading-snug">
                        {video.channelName}
                      </h2>
                      <p className="text-xs text-zinc-400">1.2M subscribers</p>
                    </div>
                    <button className="ml-2 px-5 py-2.5 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer">
                      Subscribe
                    </button>
                  </div>

                  {/* Interactive Action Buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center bg-white/10 border border-white/15 rounded-2xl overflow-hidden">
                      {/* Like Button */}
                      <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-4 py-2 transition-all text-sm font-medium cursor-pointer ${
                          liked
                            ? "bg-cyan-500 text-black font-bold"
                            : "hover:bg-white/10 text-white"
                        }`}
                      >
                        <ThumbsUp
                          size={18}
                          className={liked ? "fill-black" : ""}
                        />
                        <span>{likeCount.toLocaleString()}</span>
                      </button>

                      <div className="w-px h-6 bg-white/20" />

                      {/* Dislike Button */}
                      <button
                        onClick={handleDislike}
                        className={`px-3 py-2 transition-all cursor-pointer ${
                          disliked
                            ? "bg-red-500/30 text-red-400"
                            : "hover:bg-white/10 text-white"
                        }`}
                      >
                        <ThumbsDown
                          size={18}
                          className={disliked ? "fill-red-400" : ""}
                        />
                      </button>
                    </div>

                    <button
                      onClick={() => alert("Video link copied to clipboard!")}
                      className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15 transition-colors text-sm font-medium cursor-pointer"
                    >
                      <Share2 size={18} />
                      <span>Share</span>
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15 transition-colors text-sm font-medium sm:flex cursor-pointer">
                      <Download size={18} />
                      <span>Download</span>
                    </button>

                    <button className="p-2.5 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15 transition-colors cursor-pointer">
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>

                {/* Description Container */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-sm text-zinc-300 space-y-2 mt-2">
                  <div className="flex gap-3 text-xs font-bold text-white">
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.uploadedAt || "Recently"}</span>
                  </div>
                  <p className="leading-relaxed">
                    {video.description ||
                      "Welcome to this exclusive full guide! Learn modern UI engineering techniques with Next.js, Glassmorphism, and Tailwind CSS."}
                  </p>
                </div>
              </div>

              {/* INTERACTIVE COMMENTS SECTION */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-6 shadow-xl">
                <div className="flex items-center gap-2">
                  <MessageSquare size={22} className="text-cyan-400" />
                  <h2 className="text-xl font-bold">
                    Comments ({comments.length})
                  </h2>
                </div>

                {/* Comment Input */}
                <form onSubmit={handleAddComment} className="flex gap-3">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 bg-white/5 border border-white/10 focus:border-cyan-500 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                  >
                    <Send size={16} />
                  </button>
                </form>

                {/* Comments List */}
                <div className="flex flex-col gap-3">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-4 rounded-2xl bg-white/3 border border-white/5 flex gap-3 items-start"
                    >
                      <div className="w-9 h-9 rounded-2xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-sm shrink-0 border border-cyan-500/30">
                        {comment.author[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-zinc-200">
                            {comment.author}
                          </span>
                          <span className="text-[10px] text-zinc-500">
                            {comment.createdAt}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-300">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Videos Column */}
            <div className="w-full lg:w-96 flex flex-col gap-4 shrink-0">
              <h2 className="font-bold text-lg px-1">Related Videos</h2>
              <div className="flex flex-col gap-4">
                {relatedVideos.slice(0, 8).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 backdrop-blur-md border border-white/10 p-2.5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <VideoCard video={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}