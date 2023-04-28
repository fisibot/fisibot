import {
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from 'discord.js';
import { FisiSlashSubcommand } from '@fisitypes';
import { collections } from '@services/db/mongo';
import { RegisteredMember } from '@services/db/models/registeredMember';

function memberEmbed(member: RegisteredMember) {
  const timestamp = member._id?.getTimestamp();
  const discordTimeAgo = `<t:${timestamp?.valueOf() as number / 1000}:R>`;
  const stringDate = timestamp?.toLocaleString('es-ES', { timeZone: 'America/Lima' });

  return {
    description: `/whois <@${member.discordId}>\n`
      + `\`${member.fullname}\`\n`
      + `\`${member.gmail}\`\n`
      + `\`${member.studentCode}\`\n`
      + `_Registrado_ ${discordTimeAgo} (${stringDate})`,
  };
}

const whoisSubcommand: FisiSlashSubcommand = {
  data: new SlashCommandSubcommandBuilder()
    .setName('whois')
    .setDescription('¿Quién es este usuario?')
    .addUserOption((studentCode) => studentCode
      .setName('miembro')
      .setDescription('@Miembro del servidor')
      .setRequired(true))
    .addBooleanOption((publicOutput) => publicOutput
      .setName('visible-para-todos')
      .setDescription('Todos pueden ver el resultado (desactivado por defecto)')
      .setRequired(false)),

  run: async (interaction: ChatInputCommandInteraction) => {
    const member = interaction.options.getUser('miembro', true);
    const publicOutput = interaction.options.getBoolean('visible-para-todos', false);

    const search = (
      await collections.registrations?.find<RegisteredMember>({ discordId: member.id }).toArray()
    );

    if (search?.length) {
      await interaction.reply({
        embeds: search.map(memberEmbed),
        ephemeral: !publicOutput,
      });
      return;
    }
    await interaction.reply({
      embeds: [{ description: `${member} no ha sido encontrado en la base de registros` }],
      ephemeral: true,
    });
  },
};

export default whoisSubcommand;
