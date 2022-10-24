import { ChatInputCommandInteraction } from 'discord.js';
import { ChatCommand } from 'src/types';

const ping: ChatCommand = {
  name: 'ping',
  description: 'Replies with Pong!',
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply(
      `Pong! ${Date.now() - interaction.createdTimestamp} ms :scream_cat:`,
    );
  },
};

export default ping;
