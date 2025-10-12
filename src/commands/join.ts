import { Message, GuildMember } from 'discord.js';
import { Command } from '../types';
import { MusicPlayer } from '../utils/audioPlayer';

export const joinCommand: Command = {
  name: 'join',
  description: 'Join your voice channel',
  aliases: ['j', 'connect'],
  execute: async (message: Message, _args: string[]): Promise<void> => {
    const member = message.member as GuildMember;
    
    if (!member.voice.channel) {
      await message.reply('❌ You need to be in a voice channel first!');
      return;
    }

    try {
      const player = (global as any).musicPlayer as MusicPlayer;
      await player.joinChannel(member.voice.channel);
      await message.reply(`✅ Joined **${member.voice.channel.name}**`);
    } catch (error) {
      console.error('Error joining voice channel:', error);
      await message.reply('❌ Failed to join the voice channel.');
    }
  },
};
