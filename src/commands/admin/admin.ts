import {
  ChatInputCommandInteraction, SlashCommandBuilder,
} from 'discord.js';
import { ChatApplicationCommandWithSubcommands } from 'src/types';
import setupVerificationsSubcommand from './setup-verifications';

const admin: ChatApplicationCommandWithSubcommands = {
  data: new SlashCommandBuilder()
    .setName('admin')
    .setDescription('Admin commands')
    .addSubcommand(setupVerificationsSubcommand.data),

  run: (interaction: ChatInputCommandInteraction) => {
    const subcommand = interaction.options.getSubcommand(true);

    if (subcommand === 'setup-verifications') {
      return setupVerificationsSubcommand.run(interaction);
    }
    return interaction.reply({
      content: 'Unknown subcommand',
      ephemeral: true,
    });
  },
};

export default admin;
