import {
  CacheType, DiscordAPIError, Events, Interaction,
} from 'discord.js';
import { FisiClientEventObject } from '@fisitypes';
import botCommands from '@utils/loadBotCommands';

const SlashCommandHandler: FisiClientEventObject<Events.InteractionCreate> = {
  eventName: Events.InteractionCreate,
  handle: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;
    console.log('Slash command used:', commandName);

    if (botCommands[commandName]) {
      await botCommands[commandName].run(interaction);
    }
    else {
      try {
        await interaction.reply({
          content: `Comando no implementado: /${commandName} <:fisiflushed:1033579475042054205>`,
          ephemeral: true,
        });
      }
      catch (error) {
        if (error instanceof DiscordAPIError) {
          console.error(error, error.requestBody);
        }
      }
    }
  },
};

export default SlashCommandHandler;
