import { Video } from "@/services/api";

const LIKES_KEY = "likeVideos";

// Get all liked videos
export const getLikedVideos = (): Video[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(LIKES_KEY);
    return data ? JSON.parse(data) : [];
};

// Check if a video is liked
export const isVideoLiked = (videoId: string): boolean => {
    const likes = getLikedVideos();
    return likes.some((v: Video) => v.id === videoId);
};

// Toggle Like / Unlike
export const toggleLikeVideo = (video: Video): boolean => {
    const likes = getLikedVideos();
    const exists = likes.some((v) => v.id === video.id);

    let updatedLikes: Video[];
    if (exists) {
        // Remove if already liked ...Unlike
        updatedLikes = likes.filter((v) => v.id !== video.id);
    } else {
        // Add if not likes ...Like
        updatedLikes = [...likes, video];
    }

    localStorage.setItem(LIKES_KEY, JSON.stringify(updatedLikes));
    return !exists; // Return true if liked ..false if unliked
}