import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { FisiSlashCommandWithoutSubcommands } from 'fisitypes';

const ping: FisiSlashCommandWithoutSubcommands = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),

  run: (interaction: ChatInputCommandInteraction) => interaction.reply(
    `Pong! ${Date.now() - interaction.createdTimestamp} ms :scream_cat:`,
  ),
};

export default ping;
