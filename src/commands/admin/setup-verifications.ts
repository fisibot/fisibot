import {
  TextChannel,
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
  DiscordAPIError,
} from 'discord.js';
import { FisiSlashSubcommand } from '@fisitypes';
import registrationButton from '@components/registration-button';

const sendVerificationMessage = async (channel: TextChannel) => {
  await channel.send({
    content: '¡Bienvenido a la FISI! Regístrate antes de acceder a nuestros canales',
    components: [registrationButton()],
  });
};

const setupVerifications: FisiSlashSubcommand = {
  data: new SlashCommandSubcommandBuilder()
    .setName('setup-verifications')
    .setDescription('Setup verifications for the FISI UNMSM server')
    .addChannelOption((option) => option
      .setName('verifications-channel')
      .setDescription('Channel to listen for verifications')
      .setRequired(true)),

  run: async function runSubcommand(interaction: ChatInputCommandInteraction) {
    const channel = interaction.options.getChannel('verifications-channel');

    // Early rejecting
    if (!channel) {
      return interaction.reply({
        content: 'Internal error: Can\'t get input channel. Please report.',
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
    try {
      await sendVerificationMessage(channel);
    }
    catch (error) {
      const errorMsg = (error instanceof DiscordAPIError)
        ? ` Discord API error: ${error.message}`
        : ` Unknown error: ${error}`;

      return interaction.reply({
        content: `Can't send verification message to ${channel} <:fisiblush:1033579475042054205>. `
        + `${errorMsg}`,
        ephemeral: true,
      });
    }
    return interaction.reply({
      content: `Listen verifications in ${channel}`,
      ephemeral: true,
    });
  },
};

export default setupVerifications;
