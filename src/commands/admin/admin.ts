import {
  ChatInputCommandInteraction, SlashCommandBuilder,
} from 'discord.js';
import { FisiSlashCommandWithSubcommands } from '@fisitypes';
import setupVerificationsSubcommand from '@commands/admin/setup-verifications';
// import showRegistrationsSubcommand from '@commands/admin/show-registrations';
import embedSubcommand from '@commands/admin/embed';
import editEmbedSubcommand from '@commands/admin/edit-embed';
import destroyProcessSubcommand from '@commands/admin/destroy';
import findStudentSubcommand from '@commands/admin/find';
import addRolesSubcommand from '@commands/admin/addroles';
import whoisSubcommand from './whois';

const admin: FisiSlashCommandWithSubcommands = {
  data: new SlashCommandBuilder()
    .setName('admin')
    .setDescription('Comandos de Fisibot para los administradores')
    .addSubcommand(setupVerificationsSubcommand.data)
    // .addSubcommand(showRegistrationsSubcommand.data)
    .addSubcommand(embedSubcommand.data)
    .addSubcommand(editEmbedSubcommand.data)
    .addSubcommand(destroyProcessSubcommand.data)
    .addSubcommand(findStudentSubcommand.data)
    .addSubcommand(addRolesSubcommand.data)
    .addSubcommand(whoisSubcommand.data),

  run: async (interaction: ChatInputCommandInteraction) => {
    const subcommand = interaction.options.getSubcommand(true);

    if (subcommand === 'setup-verifications') {
      return setupVerificationsSubcommand.run(interaction);
    }
    // if (subcommand === 'show-registrations') {
    //   return showRegistrationsSubcommand.run(interaction);
    // }
    if (subcommand === 'embed') {
      return embedSubcommand.run(interaction);
    }
    if (subcommand === 'edit-embed') {
      return editEmbedSubcommand.run(interaction);
    }
    if (subcommand === 'destroy') {
      return destroyProcessSubcommand.run(interaction);
    }
    if (subcommand === 'find') {
      return findStudentSubcommand.run(interaction);
    }
    if (subcommand === 'whois') {
      return whoisSubcommand.run(interaction);
    }
    if (subcommand === 'addroles') {
      return addRolesSubcommand.run(interaction);
    }
    return interaction.reply({
      content: 'Unknown subcommand',
      ephemeral: true,
    });
  },
};

export default admin;
