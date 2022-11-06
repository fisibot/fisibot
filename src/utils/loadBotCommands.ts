import fs from 'fs';
import { FisiSlashCommandObject } from '@fisitypes';
import path from 'path';

const botCommands: Record<string, FisiSlashCommandObject> = {};

const COMMANDS_PATH = path.join(__dirname, '..', 'commands');
const commandPaths = fs.readdirSync(COMMANDS_PATH);
console.log('🍈 Loading command handlers...');

// Dynamically load all commands into `botCommands`
commandPaths.forEach(async (commandPath) => {
  if (commandPath === 'index.ts') return; // skip self
  const isDir = !commandPath.includes('.');

  if (isDir) {
    // Import commands with subcommands
    const commandName = commandPath;
    const commandModule = await import(`@commands/${commandName}/${commandName}`) as {
      default: FisiSlashCommandObject
    };
    botCommands[commandName] = commandModule.default;
    console.log(`   /${commandName} <subcommand>`);
  }
  else {
    // Import commands without subcommands
    const commandName = commandPath.substring(0, commandPath.indexOf('.'));
    const commandModule = await import(`@commands/${commandName}`) as {
      default: FisiSlashCommandObject
    };
    botCommands[commandName] = commandModule.default;
    console.log(`   /${commandName}`);
  }
});

export default botCommands;
