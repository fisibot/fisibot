import {
  ChatInputCommandInteraction, SlashCommandBuilder,
} from 'discord.js';
import { FisiSlashCommandWithSubcommands } from '@fisitypes';
import christmasPlay from '@commands/mod/play-navidad';

const admin: FisiSlashCommandWithSubcommands = {
  data: new SlashCommandBuilder()
    .setName('mod')
    .setDescription('Comandos de Fisibot para los moderadores')
    .addSubcommand(christmasPlay.data),

  run: async (interaction: ChatInputCommandInteraction) => {
    const subcommand = interaction.options.getSubcommand(true);

    if (subcommand === 'play-navidad') {
      return christmasPlay.run(interaction);
    }
    return interaction.reply({
      content: 'Unknown subcommand',
      ephemeral: true,
    });
  },
};

export default admin;
