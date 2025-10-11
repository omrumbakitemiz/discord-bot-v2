import ytdl from 'ytdl-core';

export class YouTubeDownloader {
  /**
   * Validates if the provided URL is a valid YouTube URL
   */
  static isValidYouTubeUrl(url: string): boolean {
    return ytdl.validateURL(url);
  }

  /**
   * Gets video info from YouTube URL
   */
  static async getVideoInfo(url: string) {
    try {
      const info = await ytdl.getInfo(url);
      return {
        title: info.videoDetails.title,
        duration: info.videoDetails.lengthSeconds,
        author: info.videoDetails.author.name,
        thumbnail: info.videoDetails.thumbnails[0]?.url,
      };
    } catch (error) {
      console.error('Error getting video info:', error);
      throw new Error('Failed to get video information');
    }
  }

  /**
   * Creates an audio stream from YouTube URL
   */
  static createAudioStream(url: string) {
    return ytdl(url, {
      filter: 'audioonly',
      quality: 'highestaudio',
      highWaterMark: 1 << 25, // 32MB buffer
    });
  }
}
