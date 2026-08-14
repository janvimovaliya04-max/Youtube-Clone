export interface Video {
  id: string;
  youtubeId?: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  postedAt: string;
  duration: string;
  avatarUrl?: string;
  uploadedAt?: string;
  category: string;
}

const categories = ["Coding", "Design", "Music", "Gaming", "Tech", "Podcasts", "Live"];

const prefixTitles = [
  "Mastering", "Complete Guide to", "Learn", "Build a Real-World", "The Ultimate",
  "Top Secrets of", "Zero to Hero in", "How to Build", "Modern", "Advanced"
];

const topicTitles = [
  "Next.js 16 App Router", "Tailwind CSS v4 Layouts", "TypeScript for Beginners",
  "React Server Components", "Python Machine Learning", "Node.js Microservices",
  "System Design Architecture", "Docker & Kubernetes", "Figma Design Systems",
  "Rust Game Engine", "GraphQL API Development", "Cyber Security Basics",
  "iOS App Development with SwiftUI", "Go Language Crash Course", "Web3 & Smart Contracts"
];

const channelPrefixes = ["Tech", "Code", "Dev", "Pixel", "Byte", "Digital", "Logic", "Creative"];
const channelSuffixes = ["Academy", "Zone", "Lab", "Ninja", "Daily", "Mastery", "Hub", "Studio"];

// Open-source video streams (randomized per item)
const videoUrls = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackBranding.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
];

// Unsplash Unique Tech Photo Keywords for distinct images
const photoKeywords = [
  "code", "laptop", "developer", "technology", "setup", "keyboard", "design",
  "gaming", "server", "cyberpunk", "desk", "monitor", "software", "cpu", "matrix"
];

// sample actual YouTube Video IDs
const sampleYoutubeIds = [
  "dQw4w9WgXcQ",
  "L_LUpnjgPso",
  "fJ9rUzIMcZQ",
  "kXYiU_JCYtU",
  "M576WGiDBdQ"
];

export const mockVideos: Video[] = Array.from({ length: 100 }, (_, index) => {
  const id = (index + 1).toString();

  // Unique generated title
  const prefix = prefixTitles[index % prefixTitles.length];
  const topic = topicTitles[(index * 3) % topicTitles.length];
  const title = `${prefix} ${topic} (2026 Edition)`;

  // Unique generated channel name
  const chPrefix = channelPrefixes[index % channelPrefixes.length];
  const chSuffix = channelSuffixes[(index * 2) % channelSuffixes.length];
  const channelName = `${chPrefix} ${chSuffix}`;

  const category = categories[index % categories.length];

  // Guaranteed UNIQUE Thumbnail for every single video using Unsplash Source ID + Lock Seed
  const keyword = photoKeywords[index % photoKeywords.length];
  const thumbnailUrl = `https://picsum.photos/seed/yt-${index + 101}/640/360`;

  // Random Video Stream URL
  const videoUrl = videoUrls[index % videoUrls.length];

  const views = `${Math.floor((index * 17) % 900 + 12)}K views`;
  const daysAgo = (index % 28) + 1;
  const postedAt = `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  const duration = `${Math.floor((index % 15) + 3)}:${Math.floor((index * 7) % 50 + 10)}`;

  return {
    id,
    youtubeId: sampleYoutubeIds[index % sampleYoutubeIds.length],
    title,
    description: `Welcome to this complete hands-on tutorial on ${title}! In this course, we dive deep into setup, logic, UI components, and deployment strategies with ${channelName}. Make sure to like, comment, and subscribe for weekly tutorials!`,
    videoUrl,
    thumbnailUrl,
    channelName,
    channelAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Channel-${index + 50}`,
    views,
    postedAt,
    duration,
    category,
  };
});