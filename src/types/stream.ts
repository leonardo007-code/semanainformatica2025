// Stream type definitions
export type StreamStatus = "live" | "upcoming" | "recorded" | "scheduled";
export type Platform = "youtube" | "twitch" | "facebook" | "other";

export interface Stream {
  id: number;
  title: string;
  day: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:mm format (24h)
  endTime: string; // HH:mm format (24h)
  platform: Platform;
  channelId?: string; // For YouTube channels or Twitch channels
  videoId?: string; // For YouTube videos (live or recorded)
  embedUrl?: string; // Custom embed URL if needed
  description?: string;
}

export interface StreamWithStatus extends Stream {
  status: StreamStatus;
  timeUntilStart?: number; // milliseconds
}
