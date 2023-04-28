import {
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
  GuildMember,
} from 'discord.js';
import { FisiSlashSubcommand } from '@fisitypes';
import { collections } from '@services/db/mongo';
import { RegisteredMember } from '@services/db/models/registeredMember';

const addRolesSubcommand: FisiSlashSubcommand = {
  data: new SlashCommandSubcommandBuilder()
    .setName('addroles')
    .setDescription('Añade roles masivamente')
    .addStringOption((queryList) => queryList
      .setName('codigos')
      .setDescription('Lista de usuarios a los que añadir el rol')
      .setRequired(true))
    .addRoleOption((roleToAdd) => roleToAdd
      .setName('role')
      .setDescription('Role to add')
      .setRequired(true)),

  run: async (interaction: ChatInputCommandInteraction) => {
    const roleToAdd = interaction.options.getRole('role', true);
    const queryList = interaction.options.getString('codigos', true);

    // Lista:
    // - los roles que fueron añadidos
    // - los que ya tenían el rol
    // - los que no fueron encontrados
    // - los que no tienen el rol de verificado
    const addedRoles: Map<string, RegisteredMember | undefined> = new Map();
    const alreadyHadRole: Map<string, RegisteredMember | undefined> = new Map();
    const notFound: Map<string, RegisteredMember | undefined> = new Map();
    const notVerified: Map<string, RegisteredMember | undefined> = new Map();
    const errorAdding: Map<string, RegisteredMember | undefined> = new Map();

    const studentsCodeList = queryList.trim().split(' ').filter((code) => code !== '');

    const membersFoundInDB = await collections.registrations?.find<RegisteredMember>({
      studentCode: { $in: studentsCodeList },
    }).toArray();

    // TODO: ahora mismo, no sé si usar map y cómo iterar, pero está claro el resultado
    // que quiero obtener en cada array y el output que quiero mostrar al usuario

    const guildMemberPromises = (
      membersFoundInDB?.map((member) => interaction.guild?.members.fetch(member.discordId))
    );

    const guildMembersFound = (
      await Promise.allSettled(guildMemberPromises as Promise<GuildMember>[])
    );

    // eslint-disable-next-line no-restricted-syntax
    for (const studentCode of studentsCodeList) {
      const registeredMember = membersFoundInDB
        ?.find((member) => member.studentCode === studentCode);

      if (registeredMember) {
        const guildMember = guildMembersFound.find((member) => member.status === 'fulfilled' && member.value.id === registeredMember.discordId);

        if (guildMember && guildMember.status === 'fulfilled') {
          if (!guildMember.value.roles.cache.has(process.env.VERIFIED_ROLE_ID as string)) {
            notVerified.set(studentCode, registeredMember);
          }
          else if (guildMember.value.roles.cache.has(roleToAdd.id)) {
            alreadyHadRole.set(studentCode, registeredMember);
          }
          else {
            try {
              // eslint-disable-next-line no-await-in-loop
              await guildMember.value.roles.add(roleToAdd.id);
              addedRoles.set(studentCode, registeredMember);
            }
            catch (error) {
              errorAdding.set(studentCode, registeredMember);
            }
          }
        }
        else {
          notFound.set(studentCode, registeredMember);
        }
      }
      else {
        console.log('not found', studentCode);
        notFound.set(studentCode, registeredMember);
      }
    }

    const embedsToReply: { title: string, description: string }[] = [];
    if (addedRoles.size > 0) {
      embedsToReply.push({
        title: 'Fueron añadidos',
        description: Array.from(addedRoles.entries())
          .map(([code, member]) => `\`${code}: ${member?.fullname}\` <@${member?.discordId}>`)
          .join('\n'),
      });
    }
    if (alreadyHadRole.size > 0) {
      embedsToReply.push({
        title: 'Ya tenían el rol',
        description: Array.from(alreadyHadRole.entries())
          .map(([code, member]) => `\`${code}: ${member?.fullname}\` <@${member?.discordId}>`)
          .join('\n'),
      });
    }
    if (notFound.size > 0) {
      embedsToReply.push({
        title: 'No encontrados en el servidor',
        description: Array.from(notFound.entries())
          .map(([code, _]) => `\`${code}\``) // eslint-disable-line @typescript-eslint/no-unused-vars
          .join('\n'),
      });
    }
    if (notVerified.size > 0) {
      embedsToReply.push({
        title: 'Usuarios sin verificar (No rol Fisi)',
        description: Array.from(notVerified.entries())
          .map(([code, member]) => `\`${code}: ${member?.fullname}\` <@${member?.discordId}>`)
          .join('\n'),
      });
    }
    if (errorAdding.size > 0) {
      embedsToReply.push({
        title: 'Existen, pero hubo un error al añadir el rol',
        description: Array.from(errorAdding.entries())
          .map(([code, member]) => `\`${code}: ${member?.fullname}\` <@${member?.discordId}>`)
          .join('\n'),
      });
    }

    interaction.reply({
      content: `Resultados al añadir el rol <@&${roleToAdd.id}>`,
      embeds: embedsToReply,
    });
  },
};

export default addRolesSubcommand;
