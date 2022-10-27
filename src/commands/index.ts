import fs from 'fs';
import path from 'path';
import { FisiSlashCommandObject } from '@fisitypes';

const botCommands: Record<string, FisiSlashCommandObject> = {};

const COMMANDS_PATH = __dirname;
const commandNames = fs.readdirSync(COMMANDS_PATH);

// Dynamically load all commands into `botCommands`
commandNames.forEach(async (commandName) => {
  if (commandName === 'index.ts') return; // skip self

  const commandFile = `${commandName}.ts`;
  console.log(`Loading command: ${commandFile}`);
  const commandModule = await import(path.join(COMMANDS_PATH, commandName, commandFile)) as {
    default: FisiSlashCommandObject
  };
  botCommands[commandName] = commandModule.default;
});

export default botCommands;
