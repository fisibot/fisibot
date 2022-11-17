import { CacheType, Events, Interaction } from 'discord.js';
import { FisiClientEventObject } from '@fisitypes';

const ModalSubmitHandler: FisiClientEventObject<Events.InteractionCreate> = {
  eventName: Events.InteractionCreate,
  handle: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === 'modal-destroy-fisibot') {
      const password = interaction.fields.getTextInputValue('bot-token-password');

      if (!password) {
        interaction.reply({
          content: 'No se ha ingresado un token de acceso',
          ephemeral: true,
        });
        return;
      }

      if (password === process.env.CLIENT_TOKEN) {
        try {
          await interaction.reply({
            content: 'Killing Fisibot process...',
            ephemeral: true,
          });
          interaction.client.destroy();
          process.exit(0);
        }
        catch (error) {
          await interaction.reply({
            content: `Internal error: No se pudo matar el proceso. ${error}`,
            ephemeral: true,
          });
        }
      }
      else {
        await interaction.reply({
          content: 'Token incorrecto',
          ephemeral: true,
        });
      }
    }
    else {
      // Handle other modal submits
      interaction.reply({
        content: 'No hay una acción asociada a este modal',
        ephemeral: true,
      });
    }
  },
};

export default ModalSubmitHandler;
