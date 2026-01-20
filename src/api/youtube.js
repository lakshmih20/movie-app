// Utility to fetch YouTube trailer embed URL for a given movie title
// This uses YouTube's search URL for simplicity. For production, use YouTube Data API.

export function getYouTubeTrailerUrl(title) {
  const query = encodeURIComponent(`${title} official trailer`);
  // This is a YouTube search URL. For direct embed, you need the video ID from YouTube Data API.
  return `https://www.youtube.com/embed?listType=search&list=${query}`;
}
