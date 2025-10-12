import { Client, GatewayIntentBits, Message, Interaction, CommandInteraction } from 'discord.js';
import { CONFIG } from './config';
import { commands } from './commands';
import { MusicPlayer } from './utils/audioPlayer';
import { registerSlashCommands } from './commands/slashCommands';

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
client.once('ready', async () => {
  console.log('✅ Bot is online!');
  console.log(`📝 Logged in as: ${client.user?.tag}`);
  console.log(`🎵 Serving ${client.guilds.cache.size} server(s)`);
  console.log(`📌 Command prefix: ${CONFIG.prefix}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  // Register slash commands
  try {
    await registerSlashCommands();
  } catch (error) {
    console.error('❌ Failed to register slash commands:', error);
  }
  
  // Set bot activity
  client.user?.setActivity('Use /help for commands', { type: 0 });
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

// Handle slash command interactions
client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const commandName = interaction.commandName;
  const member = interaction.member as any;

  try {
    switch (commandName) {
      case 'play': {
        const url = interaction.options.get('url')?.value as string;
        
        if (!member.voice.channel) {
          await interaction.reply('❌ You need to be in a voice channel to play music!');
          return;
        }

        if (!url) {
          await interaction.reply('❌ Please provide a YouTube URL!');
          return;
        }

        const player = (global as any).musicPlayer as MusicPlayer;
        
        if (!player.getConnection()) {
          await interaction.reply('🔄 Joining voice channel...');
          await player.joinChannel(member.voice.channel);
        }

        await interaction.reply('🔄 Loading song...');
        const result = await player.addToQueue(url, interaction.user.tag);
        await interaction.followUp(`🎵 ${result}`);
        break;
      }

      case 'join': {
        if (!member.voice.channel) {
          await interaction.reply('❌ You need to be in a voice channel!');
          return;
        }

        const player = (global as any).musicPlayer as MusicPlayer;
        await player.joinChannel(member.voice.channel);
        await interaction.reply('✅ Joined your voice channel!');
        break;
      }

      case 'leave': {
        const player = (global as any).musicPlayer as MusicPlayer;
        player.leave();
        await interaction.reply('👋 Left the voice channel!');
        break;
      }

      case 'stop': {
        const player = (global as any).musicPlayer as MusicPlayer;
        player.stop();
        await interaction.reply('⏹️ Stopped playback and cleared queue!');
        break;
      }

      case 'skip': {
        const player = (global as any).musicPlayer as MusicPlayer;
        const result = player.skip();
        await interaction.reply(result);
        break;
      }

      case 'queue': {
        const player = (global as any).musicPlayer as MusicPlayer;
        const queue = player.getQueue();
        await interaction.reply(queue);
        break;
      }

      case 'help': {
        const helpText = `🎵 **Music Bot Commands**

**Slash Commands:**
\`/play <url>\` - Play a song from YouTube
\`/join\` - Join your voice channel
\`/leave\` - Leave the voice channel
\`/stop\` - Stop playback and clear queue
\`/skip\` - Skip current song
\`/queue\` - Show current queue
\`/help\` - Show this help

**Prefix Commands (also work):**
\`${CONFIG.prefix}play <url>\` - Play a song
\`${CONFIG.prefix}join\` - Join voice channel
\`${CONFIG.prefix}leave\` - Leave voice channel
\`${CONFIG.prefix}stop\` - Stop playback
\`${CONFIG.prefix}skip\` - Skip song
\`${CONFIG.prefix}queue\` - Show queue
\`${CONFIG.prefix}help\` - Show help`;
        
        await interaction.reply(helpText);
        break;
      }

      default:
        await interaction.reply('❌ Unknown command!');
    }
  } catch (error) {
    console.error(`Error handling slash command ${commandName}:`, error);
    await interaction.reply('❌ There was an error executing that command.');
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
