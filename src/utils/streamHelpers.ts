import { Stream, StreamStatus, StreamWithStatus } from "../types/stream";

/**
 * Detecta el estado actual de un stream basado en fecha y hora
 */
export const getStreamStatus = (stream: Stream): StreamStatus => {
  const now = new Date();
  const streamDate = new Date(`${stream.date}T${stream.startTime}:00`);
  const streamEndDate = new Date(`${stream.date}T${stream.endTime}:00`);

  // Si tiene videoId y la fecha ya pasó, es grabación
  if (stream.videoId && now > streamEndDate) {
    return "recorded";
  }

  // Si está en el rango de tiempo Y tiene link, está en vivo
  if (
    now >= streamDate &&
    now <= streamEndDate &&
    (stream.videoId || stream.channelId)
  ) {
    return "live";
  }

  // Si la fecha es futura, es próximo (sin importar si tiene o no link)
  if (now < streamDate) {
    return "upcoming";
  }

  // Si ya pasó pero sin video, es scheduled (para que se oculte)
  return "scheduled";
};

/**
 * Obtiene el stream con su estado calculado
 */
export const getStreamWithStatus = (stream: Stream): StreamWithStatus => {
  const status = getStreamStatus(stream);
  const now = new Date();
  const streamDate = new Date(`${stream.date}T${stream.startTime}:00`);
  const timeUntilStart =
    status === "upcoming" ? streamDate.getTime() - now.getTime() : undefined;

  return {
    ...stream,
    status,
    timeUntilStart,
  };
};

/**
 * Genera la URL de embed según la plataforma
 */
export const getEmbedUrl = (stream: Stream): string => {
  if (stream.embedUrl) {
    return stream.embedUrl;
  }

  switch (stream.platform) {
    case "youtube":
      if (stream.videoId) {
        return `https://www.youtube.com/embed/${stream.videoId}?autoplay=1`;
      }
      if (stream.channelId) {
        return `https://www.youtube.com/embed/live_stream?channel=${stream.channelId}&autoplay=1`;
      }
      break;

    case "twitch":
      if (stream.channelId) {
        return `https://player.twitch.tv/?channel=${stream.channelId}&parent=${window.location.hostname}`;
      }
      break;

    case "facebook":
      if (stream.videoId) {
        return `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/facebook/videos/${stream.videoId}/&autoplay=true`;
      }
      break;
  }

  return "";
};

/**
 * Obtiene el stream del día actual
 */
export const getTodayStream = (streams: Stream[]): StreamWithStatus | null => {
  const today = new Date().toISOString().split("T")[0];
  const todayStream = streams.find((stream) => stream.date === today);

  return todayStream ? getStreamWithStatus(todayStream) : null;
};

/**
 * Formatea el tiempo restante para countdown
 */
export const formatCountdown = (
  milliseconds: number
): { hours: number; minutes: number; seconds: number } => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
};

/**
 * Obtiene el estado legible en español
 */
export const getStatusLabel = (status: StreamStatus): string => {
  const labels: Record<StreamStatus, string> = {
    live: "EN VIVO",
    upcoming: "PRÓXIMAMENTE",
    recorded: "GRABACIÓN DISPONIBLE",
    scheduled: "PRÓXIMAMENTE",
  };

  return labels[status];
};
