import {
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from 'discord.js';
import { FisiSlashSubcommand } from '@fisitypes';
import { collections } from '@services/db/mongo';
import RegisteredMember from '@services/db/models/registeredMember';

const setupVerifications: FisiSlashSubcommand = {
  data: new SlashCommandSubcommandBuilder()
    .setName('show-registrations')
    .setDescription('Show registrations for the FISI UNMSM server'),

  run: async (interaction: ChatInputCommandInteraction) => {
    if (!collections.registrations) {
      return interaction.reply({
        content: 'Internal error: Can\'t get registrations collection. Please report.',
        ephemeral: true,
      });
    }
    const registrations = await collections.registrations.find<RegisteredMember>({}).toArray();

    console.log(`Showing ${registrations.length} members:`, registrations);

    return interaction.reply({
      content: 'See the console hehehe',
      ephemeral: true,
    });
  },
};

export default setupVerifications;
