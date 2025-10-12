import { SlashCommandBuilder, SlashCommandSubcommandBuilder, REST, Routes } from 'discord.js';
import { CONFIG } from '../config';

// Define slash commands
export const slashCommands = [
  new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song from YouTube')
    .addStringOption(option =>
      option
        .setName('url')
        .setDescription('YouTube URL to play')
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join the voice channel you are in'),

  new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leave the voice channel'),

  new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the current song and clear the queue'),

  new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip the current song'),

  new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Show the current music queue'),

  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all available commands'),
];

// Register slash commands with Discord
export async function registerSlashCommands() {
  const rest = new REST({ version: '10' }).setToken(CONFIG.token);

  try {
    console.log('🔄 Started refreshing application (/) commands...');

    // Convert commands to JSON format
    const commandsData = slashCommands.map(command => command.toJSON());

    // Register commands globally (takes up to 1 hour to propagate)
    await rest.put(
      Routes.applicationCommands(CONFIG.clientId),
      { body: commandsData }
    );

    console.log(`✅ Successfully registered ${commandsData.length} application (/) commands globally!`);
  } catch (error) {
    console.error('❌ Error registering slash commands:', error);
    throw error;
  }
}

// Register slash commands for a specific guild (instant, for testing)
export async function registerGuildSlashCommands(guildId: string) {
  const rest = new REST({ version: '10' }).setToken(CONFIG.token);

  try {
    console.log(`🔄 Started refreshing application (/) commands for guild ${guildId}...`);

    const commandsData = slashCommands.map(command => command.toJSON());

    await rest.put(
      Routes.applicationGuildCommands(CONFIG.clientId, guildId),
      { body: commandsData }
    );

    console.log(`✅ Successfully registered ${commandsData.length} application (/) commands for guild ${guildId}!`);
  } catch (error) {
    console.error('❌ Error registering guild slash commands:', error);
    throw error;
  }
}
