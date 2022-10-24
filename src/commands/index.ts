import fs from 'fs';
import { FisiSlashCommandObject } from 'fisitypes';

const botCommands: Record<string, FisiSlashCommandObject> = {};
const commandNames = fs.readdirSync(__dirname);

// Dynamically load all commands into `botCommands`
commandNames.forEach(async (command) => {
  if (command === 'index.ts') return; // skip self

  const commandFileName = `${command}.ts`;
  const commandModule = await import(`./${command}/${commandFileName}`);
  botCommands[command] = commandModule.default as FisiSlashCommandObject;
});

export default botCommands;
