# Discord YouTube Audio Streamer Bot

A feature-rich Discord bot built with TypeScript and Node.js that can stream YouTube audio to voice channels.

## Features

- 🎵 **Stream YouTube Audio** - Play audio from YouTube videos directly in Discord voice channels
- 📝 **Text Commands** - Intuitive command system with prefix-based commands
- 🔊 **Voice Channel Support** - Join and stream audio to specific voice channels
- 📋 **Queue System** - Add multiple songs to a queue and play them in order
- ⏭️ **Playback Controls** - Skip, stop, and manage audio playback
- 🎨 **Rich Embeds** - Beautiful embedded messages for queue and help commands

## Prerequisites

Before running this bot, make sure you have:

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn** package manager
- A **Discord Bot Token** (see setup instructions below)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd discord-youtube-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and fill in your Discord bot credentials:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   DISCORD_CLIENT_ID=your_client_id_here
   COMMAND_PREFIX=!
   ```

## Getting Discord Bot Token

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section in the left sidebar
4. Click "Add Bot"
5. Under the "Token" section, click "Copy" to copy your bot token
6. Paste this token into your `.env` file as `DISCORD_TOKEN`
7. Copy the Application ID from the "General Information" page and use it as `DISCORD_CLIENT_ID`

### Bot Permissions

Your bot needs the following permissions:
- Read Messages/View Channels
- Send Messages
- Connect
- Speak

### Inviting the Bot

Create an invite URL with the following format:
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=3145728&scope=bot
```

Replace `YOUR_CLIENT_ID` with your actual client ID.

## Usage

### Development Mode

Run the bot in development mode with hot reloading:
```bash
npm run dev
```

### Production Mode

1. **Build the TypeScript code**
   ```bash
   npm run build
   ```

2. **Start the bot**
   ```bash
   npm start
   ```

## Commands

All commands use the prefix defined in your `.env` file (default: `!`)

| Command | Aliases | Description |
|---------|---------|-------------|
| `!help` | `h`, `commands` | Show all available commands |
| `!join` | `j`, `connect` | Join your current voice channel |
| `!play <URL>` | `p` | Play a YouTube video or add it to queue |
| `!skip` | `next` | Skip the current song |
| `!stop` | `s` | Stop playing and clear the queue |
| `!queue` | `q`, `list` | Show the current queue |
| `!leave` | `dc`, `disconnect` | Leave the voice channel |

### Example Usage

```
!join                                          # Join your voice channel
!play https://www.youtube.com/watch?v=dQw4w9WgXcQ  # Play a song
!queue                                         # View the queue
!skip                                          # Skip to next song
!leave                                         # Leave the voice channel
```

## Project Structure

```
discord-youtube-bot/
├── src/
│   ├── commands/           # Command implementations
│   │   ├── help.ts
│   │   ├── join.ts
│   │   ├── play.ts
│   │   ├── skip.ts
│   │   ├── stop.ts
│   │   ├── leave.ts
│   │   ├── queue.ts
│   │   └── index.ts        # Command registry
│   ├── utils/              # Utility modules
│   │   ├── audioPlayer.ts  # Audio player management
│   │   └── youtubeDownloader.ts  # YouTube audio extraction
│   ├── types.ts            # TypeScript type definitions
│   ├── config.ts           # Configuration management
│   └── index.ts            # Main bot entry point
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Technologies Used

- **[discord.js](https://discord.js.org/)** (v14) - Discord API wrapper
- **[@discordjs/voice](https://www.npmjs.com/package/@discordjs/voice)** - Voice connection handling
- **[ytdl-core](https://www.npmjs.com/package/ytdl-core)** - YouTube audio extraction
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Node.js](https://nodejs.org/)** - JavaScript runtime

## Best Practices Implemented

- ✅ **TypeScript** for type safety and better developer experience
- ✅ **Modular Architecture** with separate command files
- ✅ **Error Handling** throughout the application
- ✅ **Graceful Shutdown** handling
- ✅ **Environment Variables** for configuration
- ✅ **Queue System** for managing multiple songs
- ✅ **Event-Driven Architecture** for audio player
- ✅ **Rich User Feedback** with embeds and emojis

## Troubleshooting

### Bot doesn't respond to commands
- Make sure the bot has the "Message Content Intent" enabled in the Discord Developer Portal
- Verify your bot token is correct in the `.env` file
- Check that the bot has proper permissions in your Discord server

### Audio doesn't play
- Ensure you have `ffmpeg` installed on your system
- Verify you're in a voice channel before using play commands
- Check if the YouTube URL is valid and accessible

### "Failed to join voice channel"
- Make sure the bot has "Connect" and "Speak" permissions
- Verify the voice channel isn't full
- Check if the voice channel has any restrictions

## Notes

- The bot requires a stable internet connection for streaming YouTube audio
- Some YouTube videos may not be available for streaming due to regional restrictions
- The bot uses a queue system, so multiple songs can be added and played sequentially

## License

MIT License - feel free to use and modify as needed!
