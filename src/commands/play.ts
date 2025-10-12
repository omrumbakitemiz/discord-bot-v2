import { Message, GuildMember } from 'discord.js';
import { Command } from '../types';
import { MusicPlayer } from '../utils/audioPlayer';
import { YouTubeDownloader } from '../utils/youtubeDownloader';

export const playCommand: Command = {
  name: 'play',
  description: 'Play a song from YouTube',
  aliases: ['p'],
  execute: async (message: Message, args: string[]): Promise<void> => {
    const member = message.member as GuildMember;
    
    // Check if user is in a voice channel
    if (!member.voice.channel) {
      await message.reply('❌ You need to be in a voice channel to play music!');
      return;
    }

    // Check if a URL was provided
    if (args.length === 0) {
      await message.reply('❌ Please provide a YouTube URL!\nExample: `!play https://www.youtube.com/watch?v=...`');
      return;
    }

    const url = args[0];

    // Validate YouTube URL
    if (!YouTubeDownloader.isValidYouTubeUrl(url)) {
      await message.reply('❌ Invalid YouTube URL! Please provide a valid YouTube video URL.');
      return;
    }

    try {
      const player = (global as any).musicPlayer as MusicPlayer;
      
      // Join the voice channel if not already in one
      if (!player.getConnection()) {
        await message.reply('🔄 Joining voice channel...');
        await player.joinChannel(member.voice.channel);
      }

      // Add to queue and play
      await message.reply('🔄 Loading song...');
      const result = await player.addToQueue(url, message.author.tag);
      await message.reply(`🎵 ${result}`);
    } catch (error) {
      console.error('Error playing song:', error);
      await message.reply(`❌ Failed to play the song: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
};
