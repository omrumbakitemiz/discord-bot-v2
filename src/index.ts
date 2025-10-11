import { Client, GatewayIntentBits, Message } from 'discord.js';
import { CONFIG } from './config';
import { commands } from './commands';
import { MusicPlayer } from './utils/audioPlayer';

// Create Discord client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

// Create a global music player instance
(global as any).musicPlayer = new MusicPlayer();

// Bot ready event
client.once('ready', () => {
  console.log('✅ Bot is online!');
  console.log(`📝 Logged in as: ${client.user?.tag}`);
  console.log(`🎵 Serving ${client.guilds.cache.size} server(s)`);
  console.log(`📌 Command prefix: ${CONFIG.prefix}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  // Set bot activity
  client.user?.setActivity(`${CONFIG.prefix}help for commands`, { type: 0 });
});

// Handle incoming messages
client.on('messageCreate', async (message: Message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // Check if message starts with the prefix
  if (!message.content.startsWith(CONFIG.prefix)) return;

  // Parse command and arguments
  const args = message.content.slice(CONFIG.prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName) return;

  // Get the command
  const command = commands.get(commandName);

  if (!command) {
    await message.reply(`❌ Unknown command. Use \`${CONFIG.prefix}help\` to see available commands.`);
    return;
  }

  // Execute the command
  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(`Error executing command ${commandName}:`, error);
    await message.reply('❌ There was an error executing that command.');
  }
});

// Handle errors
client.on('error', (error) => {
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

// Login to Discord
client.login(CONFIG.token).catch((error) => {
  console.error('❌ Failed to login to Discord:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...');
  const player = (global as any).musicPlayer as MusicPlayer;
  player.leave();
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down gracefully...');
  const player = (global as any).musicPlayer as MusicPlayer;
  player.leave();
  client.destroy();
  process.exit(0);
});
