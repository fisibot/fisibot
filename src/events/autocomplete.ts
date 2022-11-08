import { CacheType, Events, Interaction } from 'discord.js';
import { FisiClientEventObject } from '@fisitypes';
import { guild } from '@root/botconfig.json';

const CommandAutocompleteHandler: FisiClientEventObject<Events.InteractionCreate> = {
  eventName: Events.InteractionCreate,
  handle: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isAutocomplete()) return;

    if (interaction.commandName === 'reglas') {
      const input = interaction.options.getString('regla', true).toLowerCase();
      const ruleObjects = guild.serverRules.map((guildRule, i) => (
        {
          name: `Regla ${(i + 1)}: ${guildRule.name}`,
          value: (i + 1).toString(),
        }
      ));
      const rulesToAutocomplete = (
        ruleObjects.filter((ruleObject) => ruleObject.name.toLowerCase().includes(input))
      );

      await interaction.respond(rulesToAutocomplete);
      return;
    }
    await interaction.respond([
      { name: 'El autocompletado no está disponible', value: '0' },
    ]);
  },
};

export default CommandAutocompleteHandler;
