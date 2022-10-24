import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ChatApplicationCommand } from 'src/types';

const ping: ChatApplicationCommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),

  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply(
      `Pong! ${Date.now() - interaction.createdTimestamp} ms :scream_cat:`,
    );
  },
};

export default ping;
