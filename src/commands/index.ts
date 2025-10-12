import { Command } from '../types';
import { helpCommand } from './help';
import { joinCommand } from './join';
import { playCommand } from './play';
import { stopCommand } from './stop';
import { skipCommand } from './skip';
import { leaveCommand } from './leave';
import { queueCommand } from './queue';

export const commands: Map<string, Command> = new Map();

// Register all commands
const commandList: Command[] = [
  helpCommand,
  joinCommand,
  playCommand,
  stopCommand,
  skipCommand,
  leaveCommand,
  queueCommand,
];

// Map commands and their aliases
commandList.forEach((command) => {
  commands.set(command.name, command);
  
  if (command.aliases) {
    command.aliases.forEach((alias) => {
      commands.set(alias, command);
    });
  }
});

export { Command };
