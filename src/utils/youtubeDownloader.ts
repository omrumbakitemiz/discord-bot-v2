import youtubedl from 'yt-dlp-exec';
import { mkdtemp, readdir, rm } from 'fs/promises';
import os from 'os';
import path from 'path';

export interface VideoMetadata {
  title: string;
  duration?: number;
  author?: string;
  thumbnail?: string;
  webpageUrl: string;
}

export interface DownloadResult {
  filePath: string;
  metadata: VideoMetadata;
  cleanup: () => Promise<void>;
}

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const SUPPORTED_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'youtu.be',
]);

export class YouTubeDownloader {
  /**
   * Validates if the provided URL is a supported YouTube URL
   */
  static isValidYouTubeUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return SUPPORTED_HOSTS.has(parsed.hostname.toLowerCase());
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets video info from YouTube URL
   */
  static async getVideoInfo(url: string): Promise<VideoMetadata> {
    try {
      const info: any = await youtubedl(url, {
        dumpSingleJson: true,
        playlistItems: '1',
        noCheckCertificates: true,
        addHeader: [`user-agent:${USER_AGENT}`],
        quiet: true,
      });

      const entry = Array.isArray(info?.entries) ? info.entries.find(Boolean) : info;
      if (!entry) {
        throw new Error('No playable video found in the provided URL');
      }

      return {
        title: entry.title ?? 'Unknown title',
        duration: entry.duration,
        author: entry.uploader ?? entry.channel,
        thumbnail: entry.thumbnail,
        webpageUrl: entry.webpage_url ?? entry.original_url ?? url,
      };
    } catch (error) {
      console.error('Error getting video info:', error);
      throw new Error('Failed to get video information');
    }
  }

  /**
   * Downloads audio from a YouTube URL into a temporary file
   */
  static async downloadAudio(url: string): Promise<DownloadResult> {
    const metadata = await this.getVideoInfo(url);
    const tempDir = await mkdtemp(path.join(os.tmpdir(), 'discord-bot-audio-'));
    const outputTemplate = path.join(tempDir, 'audio.%(ext)s');

    const cleanup = async () => {
      try {
        await rm(tempDir, { recursive: true, force: true });
      } catch (cleanupError) {
        console.error('Failed to clean up temporary files:', cleanupError);
      }
    };

    try {
      await youtubedl(metadata.webpageUrl, {
        format: 'bestaudio/best',
        output: outputTemplate,
        noPlaylist: true,
        restrictFilenames: true,
        addHeader: [`user-agent:${USER_AGENT}`],
        quiet: true,
      });

      const files = await readdir(tempDir);
      const audioFile = files.find((file) => !file.endsWith('.part') && !file.endsWith('.info.json'));
      if (!audioFile) {
        throw new Error('No audio file was downloaded');
      }

      const filePath = path.join(tempDir, audioFile);
      return {
        filePath,
        metadata,
        cleanup,
      };
    } catch (error) {
      await cleanup();
      console.error('Error downloading audio:', error);
      throw new Error('Failed to download audio');
    }
  }
}
