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
          className={`ml-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${isSubscribed
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
    </div>
  );
}