import {
  CacheType, DiscordAPIError, Events, Interaction,
} from 'discord.js';
import { FisiClientEventObject } from '@fisitypes';

const buttonPressedHandler: FisiClientEventObject<Events.InteractionCreate> = {
  eventName: Events.InteractionCreate,
  handle: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'registration-button') {
      const { REGISTRATION_FORM_URL } = process.env;
      const message = 'Bienvenido al Discord de la Fisi <:fisiflushed:1033579475042054205>\n'
      + 'Para registrarte, por favor completa el siguiente formulario:\n'
      + `${REGISTRATION_FORM_URL}\n\nTu id de discord es \`${interaction.user.id}\``;

      try {
        await interaction.user.send(message);
      }
      catch (error) {
        // User has DMs disabled
        if (error instanceof DiscordAPIError) {
          await interaction.reply({
            content: message,
            ephemeral: true,
          });
        }
        else console.log(error);
      }
      await interaction.deferReply();
      await interaction.deleteReply();

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
  },
};

export default buttonPressedHandler;
