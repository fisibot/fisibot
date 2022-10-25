import { FisiClientEventObject } from 'fisitypes';
import { CacheType, Events, Interaction } from 'discord.js';

const interactionCreateHandler: FisiClientEventObject = {
  eventName: Events.InteractionCreate,
  handle: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === 'registration-form') {
      const fullname = interaction.fields.getTextInputValue('fullname');
      const studentCode = interaction.fields.getTextInputValue('studentCode');
      console.log('Registration form submitted with values: ', fullname, studentCode);
      await interaction.deferReply();
      await interaction.deleteReply();
    }
  },
};

export default interactionCreateHandler;
