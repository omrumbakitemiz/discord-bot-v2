import { Message, EmbedBuilder } from 'discord.js';
import { Command } from '../types';
import { MusicPlayer } from '../utils/audioPlayer';

export const queueCommand: Command = {
  name: 'queue',
  description: 'Show the current queue',
  aliases: ['q', 'list'],
  execute: async (message: Message, _args: string[]): Promise<void> => {
    try {
      const player = (global as any).musicPlayer as MusicPlayer;
      const queue = player.getQueue();

      if (queue.length === 0) {
        await message.reply('📜 The queue is currently empty!');
        return;
      }

      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('🎵 Music Queue')
        .setDescription(
          queue
            .map((song, index) => `**${index + 1}.** ${song.title}\n   *Requested by: ${song.requestedBy}*`)
            .join('\n\n')
        )
        .setFooter({ text: `Total songs: ${queue.length}` })
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error showing queue:', error);
      await message.reply('❌ Failed to show the queue.');
    }
  },
};
