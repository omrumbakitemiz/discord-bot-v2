import { Message, GuildMember } from 'discord.js';
import { Command } from '../types';
import { MusicPlayer } from '../utils/audioPlayer';

export const skipCommand: Command = {
  name: 'skip',
  description: 'Skip the current song',
  aliases: ['next'],
  execute: async (message: Message, _args: string[]): Promise<void> => {
    const member = message.member as GuildMember;
    
    if (!member.voice.channel) {
      await message.reply('❌ You need to be in a voice channel!');
      return;
    }

    try {
      const player = (global as any).musicPlayer as MusicPlayer;
      
      if (!player.getIsPlaying()) {
        await message.reply('❌ Nothing is currently playing!');
        return;
      }

      player.skip();
      await message.reply('⏭️ Skipped to the next song!');
    } catch (error) {
      console.error('Error skipping song:', error);
      await message.reply('❌ Failed to skip the song.');
    }
  },
};
