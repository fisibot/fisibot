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

  // Legacy: the fullname used to be a field on the form

  return {
    description: `<@${member.discordId}>\n`
      + `\`${member.fullname}\`\n`
      + `\`${member.gmail}\`\n`
      + `\`${member.studentCode}\`\n`
      + `_Registrado_ ${discordTimeAgo} (${stringDate})`,
  };
}

const searchMemberSubcommand: FisiSlashSubcommand = {
  data: new SlashCommandSubcommandBuilder()
    .setName('find')
    .setDescription('Busca a un estudiante en el servidor según su código o correo institucional')
    .addStringOption((studentCode) => studentCode
      .setName('query')
      .setDescription('Código de estudiante o correo institucional')
      .setRequired(true))
    .addBooleanOption((publicOutput) => publicOutput
      .setName('visible-para-todos')
      .setDescription('Todos pueden ver el resultado (desactivado por defecto)')
      .setRequired(false)),

  run: async (interaction: ChatInputCommandInteraction) => {
    const query = interaction.options.getString('query', true);
    const publicOutput = interaction.options.getBoolean('visible-para-todos', false);

    // match student codes
    if (/^[0-2][0-9]20\d{4}$/.test(query)) {
      const studentCode = query;
      const search = (
        await collections.registrations?.find<RegisteredMember>({ studentCode }).toArray()
      );

      if (search?.length) {
        await interaction.reply({
          content: `Resultados para \`${studentCode}\``,
          embeds: search.map(memberEmbed),
          ephemeral: !publicOutput,
        });
        return;
      }
      await interaction.reply({
        embeds: [{ description: `Código \`${studentCode}\` no encontrado en el servidor` }],
        ephemeral: true,
      });
      return;
    }
    // match:
    // institucional emails like 'nombre.apellido#@unmsm.edu.pe'
    // gmail users          like 'nombre.apellido#'
    if (/^[a-z]+\.[a-z]+(\d+)?(@unmsm\.edu\.pe)?$/.test(query)) {
      const gmail = query.endsWith('@unmsm.edu.pe') ? query : `${query}@unmsm.edu.pe`;
      const search = (
        await collections.registrations?.find<RegisteredMember>({ gmail }).toArray()
      );

      if (search?.length) {
        await interaction.reply({
          content: `Resultados para \`${gmail}\``,
          embeds: search.map(memberEmbed),
          ephemeral: !publicOutput,
        });
        return;
      }
      await interaction.reply({
        embeds: [{ description: `Correo \`${gmail}\` no encontrado en el servidor` }],
        ephemeral: true,
      });
    }
    else {
      await interaction.reply({
        embeds: [{
          description: '**Query inválida**\n'
            + 'Prueba una de las siguientes:\n'
            + '・ `/admin find 21200xxx`\n'
            + '・ `/admin find nombre.apellido#@unmsm.edu.pe`\n'
            + '・ `/admin find nombre.apellido#`',

        }],
        ephemeral: true,
      });
    }
  },
};

export default searchMemberSubcommand;
