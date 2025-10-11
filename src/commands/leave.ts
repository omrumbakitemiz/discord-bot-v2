import { Message, GuildMember } from 'discord.js';
import { Command } from '../types';
import { MusicPlayer } from '../utils/audioPlayer';

export const leaveCommand: Command = {
  name: 'leave',
  description: 'Leave the voice channel',
  aliases: ['disconnect', 'dc'],
  execute: async (message: Message, _args: string[]): Promise<void> => {
    const member = message.member as GuildMember;
    
    if (!member.voice.channel) {
      await message.reply('❌ You need to be in a voice channel!');
      return;
    }

    try {
      const player = (global as any).musicPlayer as MusicPlayer;
      player.leave();
      await message.reply('👋 Left the voice channel!');
    } catch (error) {
      console.error('Error leaving voice channel:', error);
      await message.reply('❌ Failed to leave the voice channel.');
    }
  },
};
