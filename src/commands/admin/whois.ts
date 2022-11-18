import {
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from 'discord.js';
import { FisiSlashSubcommand } from '@fisitypes';
import { collections } from '@services/db/mongo';
import RegisteredMember from '@services/db/models/registeredMember';

function memberEmbed(member: RegisteredMember) {
  const timestamp = member._id?.getTimestamp();
  const discordTimeAgo = `<t:${timestamp?.valueOf() as number / 1000}:R>`;
  const stringDate = timestamp?.toLocaleString('es-ES', { timeZone: 'America/Lima' });

  return {
    description: `<@${member.discordId}>\n`
      + `\`${member.fullname}\`\n`
      + `\`${member.gmail}\`\n`
      + `\`${member.studentCode}\`\n`
      + `_Registrado_ ${discordTimeAgo} (${stringDate})`,
  };
}

const whoisSubcommand: FisiSlashSubcommand = {
  data: new SlashCommandSubcommandBuilder()
    .setName('whois')
    .setDescription('Busca a un estudiante en el servidor')
    .addStringOption((studentCode) => studentCode
      .setName('query')
      .setDescription('Código de estudiante o correo institucional')
      .setRequired(true)),

  run: async (interaction: ChatInputCommandInteraction) => {
    const query = interaction.options.getString('query', true);

    // match student codes
    if (/^[0-2][0-9]20\d{4}$/.test(query)) {
      const studentCode = query;
      const search = (
        await collections.registrations?.find<RegisteredMember>({ studentCode }).toArray()
      );

      if (search?.length) {
        await interaction.reply({
          embeds: search.map(memberEmbed),
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
          embeds: search.map(memberEmbed),
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
            + '・ `/admin whois 21200xxx`\n'
            + '・ `/admin whois nombre.apellido#@unmsm.edu.pe`\n'
            + '・ `/admin whois nombre.apellido#`',

        }],
        ephemeral: true,
      });
    }
  },
};

export default whoisSubcommand;
