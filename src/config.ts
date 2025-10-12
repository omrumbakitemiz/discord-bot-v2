import { config } from 'dotenv';

// Load environment variables
config();

export const CONFIG = {
  token: process.env.DISCORD_TOKEN || '',
  clientId: process.env.DISCORD_CLIENT_ID || '',
  prefix: process.env.COMMAND_PREFIX || '!',
};

// Validate configuration
if (!CONFIG.token) {
  throw new Error('DISCORD_TOKEN is required in .env file');
}

if (!CONFIG.clientId) {
  throw new Error('DISCORD_CLIENT_ID is required in .env file');
}
