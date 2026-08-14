"use client";

import { useState } from "react";
import { Video } from "@/services/api";
import { X, Loader2 } from "lucide-react";

interface EditVideoModalProps {
  video: Video;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedVideo: Video) => void;
}

export default function EditVideoModal({
  video,
  isOpen,
  onClose,
  onUpdate,
}: EditVideoModalProps) {
  const [title, setTitle] = useState(video.title);
  const [channelName, setChannelName] = useState(video.channelName || "");
  const [description, setDescription] = useState(video.description || "");
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // Backend PUT/PATCH API call
      const res = await fetch(`http://localhost:5000/api/videos/${video.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...video,
          title,
          channelName,
          description,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onUpdate(data);
        onClose();
      }
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-white/10 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-bold text-white mb-4">Edit Video Info</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-zinc-400 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 bg-zinc-800 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-medium">Channel Name</label>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="w-full mt-1 bg-zinc-800 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-medium">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 bg-zinc-800 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 flex items-center gap-2"
            >
              {isUpdating && <Loader2 size={16} className="animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}