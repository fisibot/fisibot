import {
  CacheType, DiscordAPIError, Events, Interaction,
} from 'discord.js';
import { FisiClientEventObject } from '@fisitypes';
import formsMemberDMEmbed from '@components/forms-DM-embed';
import formsUrlButton from '@components/forms-url-button';

const buttonPressedHandler: FisiClientEventObject<Events.InteractionCreate> = {
  eventName: Events.InteractionCreate,
  handle: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'registration-button') {
      try {
        await interaction.user.send({
          embeds: [formsMemberDMEmbed()],
          components: [formsUrlButton({ user_id: interaction.user.id })],
        });
        await interaction.deferReply();
        await interaction.deleteReply();
      }
      catch (error) {
        console.log('Error sending message to user', error);
        // If User has DMs disabled
        // TODO: Send DM request
        if (error instanceof DiscordAPIError) {
          await interaction.reply({
            embeds: [formsMemberDMEmbed()],
            components: [formsUrlButton({ user_id: interaction.user.id })],
            ephemeral: true,
          });
        }
        else console.log(error);
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
  },
};

export default buttonPressedHandler;
