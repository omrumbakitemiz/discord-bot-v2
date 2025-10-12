# Quick Setup Guide

## Choose Your Setup Method

### 🚀 Option 1: Deploy to Railway (Recommended for 24/7 hosting)

**Fastest way to get your bot online:**
1. See [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) for complete Railway deployment guide
2. Railway provides free hosting with $5 monthly credit
3. Automatic builds and deployments from GitHub
4. FFmpeg pre-installed, no manual setup needed

### 💻 Option 2: Run Locally (Development)

## Step-by-Step Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` and add your Discord bot credentials:
```env
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_client_id_here
COMMAND_PREFIX=!
```

### 3. Create a Discord Bot

1. Go to https://discord.com/developers/applications
2. Click "New Application"
3. Give your application a name
4. Go to the "Bot" tab on the left
5. Click "Add Bot"
6. Enable these Privileged Gateway Intents:
   - ✅ Message Content Intent
7. Copy the bot token and paste it into your `.env` file

### 4. Get Your Client ID

1. Go to the "General Information" tab
2. Copy the "Application ID"
3. Paste it into your `.env` file as `DISCORD_CLIENT_ID`

### 5. Invite the Bot to Your Server

Use this URL (replace `YOUR_CLIENT_ID` with your actual client ID):
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=3145728&scope=bot
```

The bot needs these permissions:
- View Channels
- Send Messages
- Connect
- Speak

### 6. Build and Run

#### Development Mode (with auto-reload):
```bash
npm run dev
```

#### Production Mode:
```bash
npm run build
npm start
```

## Testing the Bot

1. Join a voice channel in your Discord server
2. In a text channel, type:
   ```
   !join
   ```
3. The bot should join your voice channel
4. Play a YouTube video:
   ```
   !play https://www.youtube.com/watch?v=dQw4w9WgXcQ
   ```
5. The bot should start streaming the audio!

## Quick Command Reference

- `!help` - Show all commands
- `!join` - Join your voice channel
- `!play <URL>` - Play YouTube audio
- `!queue` - Show the queue
- `!skip` - Skip current song
- `!stop` - Stop and clear queue
- `!leave` - Leave voice channel

## Troubleshooting

**Bot doesn't respond to commands:**
- Enable "Message Content Intent" in Discord Developer Portal under Bot settings
- Make sure the bot is online (check console for "✅ Bot is online!")

**Audio doesn't play:**
- Ensure you have FFmpeg installed on your system
- Check that the YouTube URL is valid
- Verify bot has "Connect" and "Speak" permissions

**"Failed to join voice channel":**
- Make sure you're in a voice channel
- Check bot permissions in the voice channel
- Ensure the channel isn't full

## System Requirements

- Node.js v16.0.0 or higher
- NPM or Yarn
- FFmpeg (for audio processing)
- Stable internet connection

## Installing FFmpeg

### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install ffmpeg
```

### macOS:
```bash
brew install ffmpeg
```

### Windows:
Download from https://ffmpeg.org/download.html and add to PATH

## Project Features

✅ Full TypeScript support with type safety
✅ Command-based architecture
✅ Queue system for multiple songs
✅ Error handling and user feedback
✅ Modular and maintainable code structure
✅ Environment-based configuration
✅ Rich embed messages
✅ Multiple command aliases
✅ Graceful shutdown handling

## Next Steps

You can extend this bot by:
- Adding playlist support
- Implementing volume controls
- Adding song search functionality
- Creating a web dashboard
- Adding user permissions/roles
- Implementing song duration limits
- Adding lyrics fetching
- Creating auto-disconnect on idle

## Deploy to Production

For 24/7 hosting, see [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) for Railway deployment.

**Why Railway?**
- ✅ Free tier with $5 monthly credit
- ✅ Zero configuration needed
- ✅ FFmpeg pre-installed
- ✅ Automatic deployments from GitHub
- ✅ Built-in monitoring and logs
- ✅ 5 minute setup time

Happy coding! 🎵
