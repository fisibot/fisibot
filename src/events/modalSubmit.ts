import { CacheType, Events, Interaction } from 'discord.js';
import { FisiClientEventObject } from '@fisitypes';
import { collections } from '@services/db/mongo';
import RegisteredMember from '@services/db/models/registeredMember';

const interactionCreateHandler: FisiClientEventObject = {
  eventName: Events.InteractionCreate,
  handle: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === 'registration-form') {
      const fullname = interaction.fields.getTextInputValue('fullname');
      const studentCode = interaction.fields.getTextInputValue('studentCode');
      const discordId = interaction.user.id;

      console.log('Registration form submitted with values: ', fullname, studentCode);

      const registeredMember = new RegisteredMember(fullname, studentCode, discordId);
      collections.registrations!.insertOne(registeredMember);

      await interaction.deferReply();
      await interaction.deleteReply();
    }
  },
};

export default interactionCreateHandler;
