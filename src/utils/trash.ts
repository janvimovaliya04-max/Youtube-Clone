// src/utils/trash.ts
import { Video } from "@/services/api";

const TRASH_KEY = "yt_clone_trash_videos";

// Get all videos in trash
export const getTrashVideos = (): Video[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(TRASH_KEY);
  return data ? JSON.parse(data) : [];
};

// Move a video to trash
export const moveToTrash = (video: Video) => {
  const currentTrash = getTrashVideos();
  // Prevent duplicate additions
  if (!currentTrash.some((v) => v.id === video.id)) {
    const updated = [video, ...currentTrash];
    localStorage.setItem(TRASH_KEY, JSON.stringify(updated));
  }
};

// Restore video from trash
export const restoreFromTrash = (videoId: string): Video | null => {
  const currentTrash = getTrashVideos();
  const restoredVideo = currentTrash.find((v) => v.id === videoId) || null;
  const updatedTrash = currentTrash.filter((v) => v.id !== videoId);
  localStorage.setItem(TRASH_KEY, JSON.stringify(updatedTrash));
  return restoredVideo;
};

// Permanent delete from trash
export const permanentDeleteFromTrash = (videoId: string) => {
  const currentTrash = getTrashVideos();
  const updatedTrash = currentTrash.filter((v) => v.id !== videoId);
  localStorage.setItem(TRASH_KEY, JSON.stringify(updatedTrash));
};