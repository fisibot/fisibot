import fs from 'fs';
import { ChatApplicationCommand } from 'types';

const botCommands: Record<string, ChatApplicationCommand> = {};
const commandNames = fs.readdirSync(__dirname);

commandNames.forEach(async (command) => {
  if (command === 'index.ts') return; // skip self
  const commandFileName = `${command}.ts`;

  // Dynamic import command with type module
  const commandModule = await import(`./${command}/${commandFileName}`);

  // Save command into commands object
  botCommands[command] = commandModule.default;
});

export default botCommands;
