import fs from 'fs';
import { ChatCommand } from 'src/types';

const botCommands: Record<string, ChatCommand> = {};
const commandNames = fs.readdirSync(__dirname);

commandNames.forEach(async (commandFileName) => {
  if (commandFileName === __filename) return; // skip self

  // Dynamic import command with type module
  const commandModule = await import(`./${commandFileName}`);

  // Save command into commands object
  const commandName = commandFileName.substring(0, commandFileName.indexOf('.'));
  botCommands[commandName] = commandModule.default;
});

export default botCommands;
