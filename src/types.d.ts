import { CommandInteraction } from 'discord.js';

interface ChatCommand {
  name: string;
  description: string;
  run: (interaction: CommandInteraction) => Promise<void>;
}
