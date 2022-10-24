import {
  TextChannel,
  ChatInputCommandInteraction,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ActionRowBuilder,
} from 'discord.js';
import { ChatCommand } from 'src/types';

const setupVerifications = async (channel: TextChannel) => {
  const actionRow = new ActionRowBuilder<ButtonBuilder>();
  const button = new ButtonBuilder()
    .setCustomId('registration-button')
    .setEmoji('1033579475042054205')
    .setLabel('Regístrame')
    .setStyle(1);
  actionRow.addComponents(button);
  // TODO: Try-catch for permission errors
  await channel.send({
    content: '¡Bienvenido a la FISI! Regístrate antes de acceder a nuestros canales',
    components: [actionRow],
  });
};

const admin: ChatCommand = {
  name: 'admin',
  description: 'Admin commands',
  options: [
    {
      name: 'setup-verifications',
      description: 'Setup verifications',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'verifications-channel',
          description: 'Channel to listen for verifications',
          type: ApplicationCommandOptionType.Channel,
          required: true,
        },
      ],
    },
  ],
  run: async (interaction: ChatInputCommandInteraction) => {
    const subcommand = interaction.options.getSubcommand(true);

    if (subcommand === 'setup-verifications') {
      const channel = interaction.options.getChannel('verifications-channel');

      // Early rejecting
      if (!channel) {
        return interaction.reply({
          content: "Internal error: Can't get input channel. Please report.",
          ephemeral: true,
        });
      }
      if (!(channel instanceof TextChannel)) {
        return interaction.reply({
          content: 'Cant do this in the selected channel',
          ephemeral: true,
        });
      }

      // All OK
      await setupVerifications(channel);
      return interaction.reply(
        {
          content: `Listen verifications in ${channel}`,
          ephemeral: true,
        },
      );
    }
    return interaction.reply(
      'Cant do this in the selected channel',
    );
  },
};

export default admin;
