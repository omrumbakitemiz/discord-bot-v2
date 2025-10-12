import { Message, GuildMember } from 'discord.js';
import { Command } from '../types';
import { MusicPlayer } from '../utils/audioPlayer';

export const stopCommand: Command = {
  name: 'stop',
  description: 'Stop playing music and clear the queue',
  aliases: ['s'],
  execute: async (message: Message, _args: string[]): Promise<void> => {
    const member = message.member as GuildMember;
    
    if (!member.voice.channel) {
      await message.reply('❌ You need to be in a voice channel!');
      return;
    }

    try {
      const player = (global as any).musicPlayer as MusicPlayer;
      player.stop();
      await message.reply('⏹️ Stopped playing and cleared the queue.');
    } catch (error) {
      console.error('Error stopping player:', error);
      await message.reply('❌ Failed to stop the player.');
    }
  },
};
