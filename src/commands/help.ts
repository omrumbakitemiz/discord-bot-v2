import { Message, EmbedBuilder } from 'discord.js';
import { Command } from '../types';
import { CONFIG } from '../config';

export const helpCommand: Command = {
  name: 'help',
  description: 'Show all available commands',
  aliases: ['h', 'commands'],
  execute: async (message: Message, _args: string[]): Promise<void> => {
    const prefix = CONFIG.prefix;
    
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('🤖 Bot Commands')
      .setDescription('Here are all the available commands:')
      .addFields(
        {
          name: `${prefix}join (${prefix}j)`,
          value: 'Join your current voice channel',
          inline: false,
        },
        {
          name: `${prefix}play <YouTube URL> (${prefix}p)`,
          value: 'Play a song from YouTube or add it to the queue',
          inline: false,
        },
        {
          name: `${prefix}skip (${prefix}next)`,
          value: 'Skip the current song',
          inline: false,
        },
        {
          name: `${prefix}stop (${prefix}s)`,
          value: 'Stop playing and clear the queue',
          inline: false,
        },
        {
          name: `${prefix}queue (${prefix}q)`,
          value: 'Show the current queue',
          inline: false,
        },
        {
          name: `${prefix}leave (${prefix}dc)`,
          value: 'Leave the voice channel',
          inline: false,
        },
        {
          name: `${prefix}help (${prefix}h)`,
          value: 'Show this help message',
          inline: false,
        }
      )
      .setFooter({ text: 'Use commands with the prefix: ' + prefix })
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  },
};
