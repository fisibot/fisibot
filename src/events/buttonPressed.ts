import {
  CacheType, DiscordAPIError, Events, Interaction,
} from 'discord.js';
import { FisiClientEventObject } from '@fisitypes';
import formsMemberDMEmbed from '@components/forms-DM-message';

const buttonPressedHandler: FisiClientEventObject<Events.InteractionCreate> = {
  eventName: Events.InteractionCreate,
  handle: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'registration-button') {
      const { formsEmbed, formsButton } = formsMemberDMEmbed({ user_id: interaction.user.id });
      try {
        await interaction.user.send({
          embeds: [formsEmbed],
          components: [formsButton],
        });
        await interaction.reply({
          content: 'Te he enviado el formulario por mensaje privado <:fisiflushed:1033579475042054205>',
          ephemeral: true,
        });
      }
      catch (error) {
        console.warn('WARN: Can\'t send DM to user, sending to channel instead');
        // If User has DMs disabled
        // TODO: Send DM request
        if (error instanceof DiscordAPIError) {
          await interaction.reply({
            embeds: [formsEmbed],
            components: [formsButton],
            ephemeral: true,
          });
        }
        else console.log({ error });
      }

      // TODO: check if user is already registered

      // const findQuery = { discordId: interaction.user.id };
      // const registration = await collections.registrations?.findOne<RegisteredMember>(findQuery);
      // if (registration) {
      //   interaction.reply({
      //     content: 'You are already registered',
      //     ephemeral: true,
      //   });
      // }
      // else interaction.showModal(registrationModal());
    }
    else if (interaction.customId === 'confirm-send-embed-button') {
      await interaction.deferReply();
      await interaction.deleteReply();
      // resend interaction message
      const messageToResend = interaction.message;
      messageToResend.channel.send({
        content: messageToResend.content,
        embeds: messageToResend.embeds,
      });
    }
  },
};

export default buttonPressedHandler;
