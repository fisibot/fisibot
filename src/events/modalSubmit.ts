import { CacheType, Events, Interaction } from 'discord.js';
import { FisiClientEventObject } from '@fisitypes';

const ModalSubmitHandler: FisiClientEventObject<Events.InteractionCreate> = {
  eventName: Events.InteractionCreate,
  handle: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === '<MODAL_ID>') {
      // Handle modal submit
    }
  },
};

export default ModalSubmitHandler;
