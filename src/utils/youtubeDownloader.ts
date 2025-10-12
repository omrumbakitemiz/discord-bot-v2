import ytdl from '@distube/ytdl-core';
import ytpl from 'ytpl';

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
      let finalUrl = url;

      if (ytpl.validateID(url)) {
        const playlist = await ytpl(url, { limit: 1 });
        const firstItem = playlist.items[0];

        if (!firstItem?.shortUrl) {
          throw new Error('Playlist does not contain any playable videos');
        }

        finalUrl = firstItem.shortUrl;
      }

      const info = await ytdl.getInfo(finalUrl);
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
      requestOptions: {
        headers: {
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        },
      },
    });
  }
}
