import {
  ChatInputCommandInteraction, SlashCommandBuilder,
} from 'discord.js';
import { FisiSlashCommandWithSubcommands } from '@fisitypes';
import setupVerificationsSubcommand from '@commands/admin/setup-verifications';
import showRegistrationsSubcommand from '@commands/admin/show-registrations';

const admin: FisiSlashCommandWithSubcommands = {
  data: new SlashCommandBuilder()
    .setName('admin')
    .setDescription('Admin commands')
    .addSubcommand(setupVerificationsSubcommand.data)
    .addSubcommand(showRegistrationsSubcommand.data),

  run: async (interaction: ChatInputCommandInteraction) => {
    const subcommand = interaction.options.getSubcommand(true);

    if (subcommand === 'setup-verifications') {
      return setupVerificationsSubcommand.run(interaction);
    }
    if (subcommand === 'show-registrations') {
      return showRegistrationsSubcommand.run(interaction);
    }
    return interaction.reply({
      content: 'Unknown subcommand',
      ephemeral: true,
    });
  },
};

export default admin;
