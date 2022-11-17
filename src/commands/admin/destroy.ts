import {
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from 'discord.js';
import { FisiSlashSubcommand } from '@fisitypes';

const killProcessSubcommand: FisiSlashSubcommand = {
  data: new SlashCommandSubcommandBuilder()
    .setName('destroy')
    .setDescription('Kill the Fisibot current process'),

  run: async (interaction: ChatInputCommandInteraction) => {
    // Opens a password modal
    const passwordModal = new ModalBuilder()
      .setCustomId('modal-destroy-fisibot')
      .setTitle('Kill Fisibot process');

    const actionRow = new ActionRowBuilder<TextInputBuilder>();
    const passwordInput = new TextInputBuilder()
      .setCustomId('bot-token-password')
      .setLabel('Client secret token')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    actionRow.addComponents(passwordInput);
    passwordModal.addComponents(actionRow);
    return interaction.showModal(passwordModal);
  },
};

export default killProcessSubcommand;
