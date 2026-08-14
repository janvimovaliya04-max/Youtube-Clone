export interface Video {
    id: string;
    title: string;
    thumbnailUrl: string;
    channelName: string;
    description: string; // Made required to match existing components
    duration?: string;
    views?: string;
    uploadedAt?: string;
    category?: string;
    videoUrl?: string;
    channelAvatar?: string;
    postedAt?: string;
    youtubeId?: string;
    avatarUrl?: string;
}

const BASE_URL = "https://6a7c5e3fa008c10e4cbf4c95.mockapi.io/videos";

export async function getVideos(category: string = "All", query: string = ""): Promise<Video[]> {
    try {
        const res = await fetch(BASE_URL, { cache: "no-store" });
        if (!res.ok) return [];

        let rawData: any[] = await res.json();

        // Ensure description & essential fields always exist
        let data: Video[] = rawData.map((item) => ({
            ...item,
            description: item.description || "No description available.",
        }));

        if (category && category !== "All") {
            data = data.filter((v) => v.category?.toLowerCase() === category.toLowerCase());
        }

        if (query.trim() !== "") {
            const q = query.toLowerCase();
            data = data.filter((v) => v.title?.toLowerCase().includes(q) || v.channelName?.toLowerCase().includes(q));
        }

        return data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}

export async function getVideoById(id: string): Promise<Video | null> {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
        if (!res.ok) return null;

        const item = await res.json();
        return {
            ...item,
            description: item.description || "No description available.",
        };
    } catch (error) {
        console.error(`Error fetching video with ID ${id}:`, error);
        return null;
    }
}

// 3. POST - Create new video
export async function createVideo(video: Omit<Video, "id">): Promise<Video | null> {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(video),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error creating video:", error);
    return null;
  }
}

// 4. PUT - Update video by ID
export async function updateVideo(id: string, video: Partial<Video>): Promise<Video | null> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(video),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Error updating video ${id}:`, error);
    return null;
  }
}

// 5. DELETE - Delete video by ID
export async function deleteVideo(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (error) {
    console.error(`Error deleting video ${id}:`, error);
    return false;
  }
}