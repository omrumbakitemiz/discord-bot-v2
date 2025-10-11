import {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayer,
  AudioPlayerStatus,
  VoiceConnection,
  VoiceConnectionStatus,
  entersState,
} from '@discordjs/voice';
import { VoiceBasedChannel } from 'discord.js';
import { YouTubeDownloader } from './youtubeDownloader';
import { AudioQueueItem } from '../types';

export class MusicPlayer {
  private player: AudioPlayer;
  private connection: VoiceConnection | null = null;
  private queue: AudioQueueItem[] = [];
  private isPlaying: boolean = false;

  constructor() {
    this.player = createAudioPlayer();
    this.setupPlayerListeners();
  }

  /**
   * Setup event listeners for the audio player
   */
  private setupPlayerListeners(): void {
    this.player.on(AudioPlayerStatus.Idle, () => {
      console.log('Player is idle, playing next in queue...');
      this.isPlaying = false;
      this.playNext();
    });

    this.player.on(AudioPlayerStatus.Playing, () => {
      console.log('Audio player started playing');
      this.isPlaying = true;
    });

    this.player.on('error', (error) => {
      console.error('Audio player error:', error);
      this.isPlaying = false;
      this.playNext();
    });
  }

  /**
   * Join a voice channel
   */
  async joinChannel(channel: VoiceBasedChannel): Promise<void> {
    if (this.connection && this.connection.state.status !== VoiceConnectionStatus.Destroyed) {
      // Already connected, just switch channels
      this.connection.destroy();
    }

    this.connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator as any,
    });

    try {
      await entersState(this.connection, VoiceConnectionStatus.Ready, 30_000);
      this.connection.subscribe(this.player);
      console.log(`Successfully joined voice channel: ${channel.name}`);
    } catch (error) {
      console.error('Failed to join voice channel:', error);
      this.connection.destroy();
      throw new Error('Failed to join voice channel within 30 seconds');
    }
  }

  /**
   * Add a song to the queue and play if not already playing
   */
  async addToQueue(url: string, requestedBy: string): Promise<string> {
    if (!YouTubeDownloader.isValidYouTubeUrl(url)) {
      throw new Error('Invalid YouTube URL');
    }

    const videoInfo = await YouTubeDownloader.getVideoInfo(url);
    
    this.queue.push({
      url,
      title: videoInfo.title,
      requestedBy,
    });

    if (!this.isPlaying) {
      this.playNext();
      return `Now playing: **${videoInfo.title}**`;
    } else {
      return `Added to queue: **${videoInfo.title}** (Position: ${this.queue.length})`;
    }
  }

  /**
   * Play the next song in the queue
   */
  private async playNext(): Promise<void> {
    if (this.queue.length === 0) {
      console.log('Queue is empty');
      return;
    }

    const song = this.queue.shift();
    if (!song) return;

    try {
      const stream = YouTubeDownloader.createAudioStream(song.url);
      const resource = createAudioResource(stream);
      
      this.player.play(resource);
      console.log(`Now playing: ${song.title}`);
    } catch (error) {
      console.error('Error playing song:', error);
      this.playNext(); // Try to play the next song
    }
  }

  /**
   * Stop playing and clear the queue
   */
  stop(): void {
    this.queue = [];
    this.player.stop();
    this.isPlaying = false;
  }

  /**
   * Skip the current song
   */
  skip(): void {
    this.player.stop(); // This will trigger the Idle event and play the next song
  }

  /**
   * Leave the voice channel
   */
  leave(): void {
    this.stop();
    if (this.connection) {
      this.connection.destroy();
      this.connection = null;
    }
  }

  /**
   * Get the current queue
   */
  getQueue(): AudioQueueItem[] {
    return [...this.queue];
  }

  /**
   * Check if the player is currently playing
   */
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Get the current voice connection
   */
  getConnection(): VoiceConnection | null {
    return this.connection;
  }
}
