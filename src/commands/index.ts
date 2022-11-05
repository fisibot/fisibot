import fs from 'fs';
import { FisiSlashCommandObject } from '@fisitypes';

const botCommands: Record<string, FisiSlashCommandObject> = {};

const COMMANDS_PATH = __dirname;
const commandPaths = fs.readdirSync(COMMANDS_PATH);
console.log('🍈 Loading command handlers...');

// Dynamically load all commands into `botCommands`
commandPaths.forEach(async (commandPath) => {
  if (commandPath === 'index.ts') return; // skip self
  const isDir = !commandPath.includes('.');

  if (isDir) {
    const commandName = commandPath;
    const commandModule = await import(`@commands/${commandName}/${commandName}`) as {
      default: FisiSlashCommandObject
    };
    botCommands[commandName] = commandModule.default;
    console.log(` - ${commandName}`);
  }
  else {
    const commandName = commandPath.substring(0, commandPath.indexOf('.'));
    const commandModule = await import(`@commands/${commandName}`) as {
      default: FisiSlashCommandObject
    };
    botCommands[commandName] = commandModule.default;
    console.log(` - ${commandName}`);
  }
});

export default botCommands;
