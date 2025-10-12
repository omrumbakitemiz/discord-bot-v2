import { registerSlashCommands, registerGuildSlashCommands } from '../src/commands/slashCommands';
import { CONFIG } from '../src/config';

async function main() {
  try {
    console.log('🚀 Starting command registration...');
    
    // Check if we have a guild ID for testing (optional)
    const guildId = process.env.GUILD_ID;
    
    if (guildId) {
      console.log(`📝 Registering commands for guild: ${guildId}`);
      await registerGuildSlashCommands(guildId);
    } else {
      console.log('📝 Registering commands globally...');
      await registerSlashCommands();
    }
    
    console.log('✅ Command registration completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to register commands:', error);
    process.exit(1);
  }
}

main();
