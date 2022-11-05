import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { FisiSlashCommandWithoutSubcommands } from '@fisitypes';
import serverStatusEmbed from '@components/serverStatus-embed';

const status: FisiSlashCommandWithoutSubcommands = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('See the fisibot server status'),

  run: async (interaction: ChatInputCommandInteraction) => {
    const serverStatus = await serverStatusEmbed(interaction.client);

    return interaction.reply({
      embeds: [serverStatus],
    });
  },
};

export default status;
