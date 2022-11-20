import {
  SlashCommandSubcommandBuilder,
  ChatInputCommandInteraction,
  AttachmentBuilder, DiscordAPIError, TextChannel,
} from 'discord.js';
import { FisiSlashSubcommand } from '@fisitypes';
import registrationButton from '@components/registration-button';

const sendVerificationMessage = async (channel: TextChannel) => {
  const verificationBanner = new AttachmentBuilder('src/assets/banners/verification.png');
  const verificationTutorial = new AttachmentBuilder('src/assets/banners/verification_tutorial.png');
  await channel.send({
    embeds: [{
      title: '<:fisi:1033062991035375666> Facultad de Ingeniería de Sistemas e Informática <:fisi:1033062991035375666>',
      description: 'Has llegado al servidor oficial de la FISI UNMSM\n\n'
        + 'Este servidor es exclusivo para estudiantes de nuestra facultad\n\n'
        + '・ Verifícate con algunas de las siguientes opciones\n'
        + '・ ¿Problemas al registrarte? abre un ticket en <#1042710855776731238>',
    }],
    components: [registrationButton()],
    files: [verificationBanner, verificationTutorial],
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
        content: `Can't send verification message to ${channel} <:fisiflushed:1033579475042054205>. `
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
