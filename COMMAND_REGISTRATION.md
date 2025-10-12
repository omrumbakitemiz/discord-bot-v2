# Discord Slash Command Registration

This bot supports both **slash commands** (modern) and **prefix commands** (legacy).

## Available Commands

### Slash Commands (Recommended)
- `/play <url>` - Play a song from YouTube
- `/join` - Join your voice channel
- `/leave` - Leave the voice channel
- `/stop` - Stop playback and clear queue
- `/skip` - Skip current song
- `/queue` - Show current queue
- `/help` - Show all commands

### Prefix Commands (Legacy)
- `!play <url>` - Play a song from YouTube
- `!join` - Join voice channel
- `!leave` - Leave voice channel
- `!stop` - Stop playback
- `!skip` - Skip song
- `!queue` - Show queue
- `!help` - Show help

## How Commands Are Registered

### Automatic Registration
Commands are automatically registered when the bot starts up. The bot will:
1. Register slash commands globally with Discord
2. Commands will be available in all servers where the bot is present
3. Registration happens in the `ready` event handler

### Manual Registration (Optional)
If you need to register commands manually:

```bash
# Register commands globally (takes up to 1 hour to propagate)
npm run register-commands

# Register commands for a specific guild (instant, for testing)
GUILD_ID=your_guild_id npm run register-commands
```

## Environment Variables Required

Make sure these are set in your `.env` file:
```env
DISCORD_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_bot_client_id
```

## Command Registration Process

1. **Bot starts** → Registers slash commands automatically
2. **Commands appear** in Discord's slash command menu
3. **Users can use** both `/play` and `!play` commands
4. **Bot responds** to both interaction types

## Troubleshooting

### Commands Not Appearing
- Check that `DISCORD_CLIENT_ID` is set correctly
- Verify bot has proper permissions in the server
- Wait up to 1 hour for global commands to propagate
- Use guild-specific registration for testing

### Permission Issues
- Bot needs `applications.commands` scope
- Bot needs `bot` scope for voice channel access
- Bot needs to be in the server where commands are used

## Development

To add new slash commands:
1. Add command definition to `src/commands/slashCommands.ts`
2. Add handler in `src/index.ts` interaction handler
3. Restart bot to register new commands
