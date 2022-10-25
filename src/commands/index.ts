import fs from 'fs';
import { FisiSlashCommandObject } from 'fisitypes';
import path from 'path';

const botCommands: Record<string, FisiSlashCommandObject> = {};

const COMMANDS_PATH = __dirname;
const commandNames = fs.readdirSync(COMMANDS_PATH);

// Dynamically load all commands into `botCommands`
commandNames.forEach(async (commandName) => {
  if (commandName === 'index.ts') return; // skip self

  const commandFile = `${commandName}.ts`;
  console.log(`Loading command: ${commandFile}`);
  const commandModule = await import(path.join(COMMANDS_PATH, commandName, commandFile));
  botCommands[commandName] = commandModule.default as FisiSlashCommandObject;
});

export default botCommands;
