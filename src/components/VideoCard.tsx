"use client";

import React, { useState } from "react";
import { moveToTrash } from "@/utils/trash";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Loader2, Pencil } from "lucide-react";
import { Video } from "@/services/api";

interface VideoCardProps {
  video: Video;
  onDelete?: (id: string) => void;
  onEdit?: (video: Video) => void;
}

export default function VideoCard({ video, onDelete, onEdit }: VideoCardProps) {
  // Clear out extra "views" string if already coming from API
  const formattedViews = video.views
    ? video.views.replace(/views/gi, "").trim()
    : "100K";

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();   // 👈 Navigation stop kare chhe
    e.stopPropagation();  // 👈 Parent card link trigger thavathi atkave chhe

    if (confirm(`Are you sure you want to move "${video.title}" to trash?`)) {
      setIsDeleting(true);

      // 🟢 1. Save video object to Trash storage first!
      moveToTrash(video);

      // 🟢 2. Parent delete handler callback call karo (UI update mate)
      if (onDelete) {
        await onDelete(video.id);
      }

      setIsDeleting(false);
    }
  };

  return (
    <Link href={`/watch/${video.id}`} className="group block h-full">
      {/* Glass Container */}
      <div className="bg-white/3 backdrop-blur-xl border border-white/10 rounded-2xl p-3 hover:bg-white/8 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-cyan-500/5 h-full flex flex-col justify-between relative">

        <div>
          {/* Thumbnail */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-zinc-900/50">
            <Image
              src={video.thumbnailUrl || "https://picsum.photos/seed/placeholder/640/360"}
              alt={video.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {video.duration && (
              <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-md border border-white/10">
                {video.duration}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex gap-3 items-start">
            {/* Avatar */}
            <div className="relative w-8 h-8 shrink-0 rounded-full overflow-hidden border border-white/10 bg-zinc-800">
              <Image
                src={video.avatarUrl || video.channelAvatar || "https://i.pravatar.cc/150?img=1"}
                alt={video.channelName || "Channel"}
                fill
                className="object-cover"
              />
            </div>

            {/* Meta */}
            <div className="flex flex-col min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                {video.title}
              </h3>

              <p className="text-xs text-zinc-400 mt-1 font-medium hover:text-zinc-200 transition-colors">
                {video.channelName}
              </p>

              {/* Views & Time Fixed */}
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mt-1">
                <span>{formattedViews} views</span>
                <span>•</span>
                <span>{video.uploadedAt || video.postedAt || "Recently"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 🟡 Actions Wrapper (Placed at Card level for accurate relative positioning) */}
        <div className="absolute top-5 right-5 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">

          {/* EDIT BUTTON */}
          {onEdit && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(video);
              }}
              title="Edit Video"
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg cursor-pointer transition-transform hover:scale-110 flex items-center justify-center"
            >
              <Pencil size={15} />
            </button>
          )}

          {/* DELETE BUTTON */}
          {onDelete && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              title="Delete Video"
              className="p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white shadow-lg cursor-pointer transition-transform hover:scale-110 flex items-center justify-center"
            >
              {isDeleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
            </button>
          )}

        </div>

      </div>
    </Link>
  );
}