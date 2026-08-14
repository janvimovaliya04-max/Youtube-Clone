"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Share2, Bell, Check } from "lucide-react";

interface VideoActionsProps {
  initialLikes?: number;
  channelName: string;
}

export default function VideoActions({
  initialLikes = 12400,
  channelName,
}: VideoActionsProps) {
  // States
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Like Logic
  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
      if (isDisliked) setIsDisliked(false);
    }
  };

  // Dislike Logic
  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      if (isLiked) {
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      }
    }
  };

  // Share Logic (Copy Link)
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-3 my-2 border-y border-white/10">
      {/* Channel Info & Subscribe Button */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {channelName.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3 className="font-semibold text-white leading-tight">
            {channelName}
          </h3>
          <p className="text-xs text-zinc-400">128K subscribers</p>
        </div>

        {/* Dynamic Subscribe Button */}
        <button
          onClick={() => setIsSubscribed(!isSubscribed)}
          className={`ml-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
            isSubscribed
              ? "bg-white/10 text-zinc-300 border border-white/20 hover:bg-white/20"
              : "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 active:scale-95"
          }`}
        >
          {isSubscribed ? (
            <>
              <Bell className="w-4 h-4 fill-current text-zinc-300" />
              <span>Subscribed</span>
            </>
          ) : (
            <span>Subscribe</span>
          )}
        </button>
      </div>

      {/* Like, Dislike & Share Button Group */}
      <div className="flex items-center gap-3">
        {/* Like & Dislike Pills */}
        <div className="flex items-center bg-white/5 border border-white/10 backdrop-blur-md rounded-full p-1">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-l-full text-sm font-medium transition-all ${
              isLiked
                ? "text-blue-400 bg-white/10"
                : "text-zinc-300 hover:bg-white/10"
            }`}
          >
            <ThumbsUp
              className={`w-4 h-4 ${isLiked ? "fill-current text-blue-400" : ""}`}
            />
            <span>{likesCount.toLocaleString()}</span>
          </button>

          <div className="w-px h-4 bg-white/10" />

          <button
            onClick={handleDislike}
            className={`px-3 py-1.5 rounded-r-full text-sm font-medium transition-all ${
              isDisliked
                ? "text-red-400 bg-white/10"
                : "text-zinc-300 hover:bg-white/10"
            }`}
          >
            <ThumbsDown
              className={`w-4 h-4 ${
                isDisliked ? "fill-current text-red-400" : ""
              }`}
            />
          </button>
        </div>

        {/* Glassmorphic Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 rounded-full text-sm font-medium text-zinc-300 transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}