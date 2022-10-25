import { CacheType, Events, Interaction } from 'discord.js';
import { FisiClientEventObject } from 'fisitypes';
import botCommands from '../commands';

const interactionCreateHandler: FisiClientEventObject = {
  eventName: Events.InteractionCreate,
  handle: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (botCommands[commandName]) {
      await botCommands[commandName].run(interaction);
    }
    else {
      await interaction.reply({
        content: `Comando no implementado: /${commandName} <:fisiblush:1033579475042054205>`,
        ephemeral: true,
      });
    }
  },
};

export default interactionCreateHandler;
