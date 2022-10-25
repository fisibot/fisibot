import { FisiClientEventObject } from 'fisitypes';
import { CacheType, Events, Interaction } from 'discord.js';
import registrationModal from '../components/registration-modal';

const interactionCreateHandler: FisiClientEventObject = {
  eventName: Events.InteractionCreate,
  handle: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'registration-button') {
      await interaction.showModal(registrationModal());
    }
  },
};

export default interactionCreateHandler;
