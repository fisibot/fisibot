import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { FisiSlashCommandWithoutSubcommands } from '@fisitypes';
import { guild } from '@root/botconfig.json';

const reglas: FisiSlashCommandWithoutSubcommands = {
  data: new SlashCommandBuilder()
    .setName('reglas')
    .setDescription('Información sobre las reglas sagradas del servidor')
    .addStringOption((option) => option
      .setName('regla')
      .setDescription('Regla que quieres consultar')
      .setRequired(true)
      .setAutocomplete(true)),

  run: async (interaction: ChatInputCommandInteraction) => {
    const input = interaction.options.getString('regla', true).toLowerCase();
    let ruleNumber: number;

    if (input.startsWith('regla')) {
      ruleNumber = Number(input.split('regla')[1].trim());
    }
    else {
      ruleNumber = Number(input);
    }

    if (Number.isNaN(ruleNumber)) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setDescription(
            `\`/reglas '${input}'\` <:fisithink:1040146700494458920> ?`
            + '\n\n Prueba `/reglas <número>` o usa el autocompletado',
          )],
        ephemeral: true,
      });
    }
    const ruleIndex = ruleNumber - 1;
    const guildRule = guild.serverRules[ruleIndex];

    if (!guildRule) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setDescription(`La regla \`${ruleNumber}\` aún no ha sido escrita`)],
        ephemeral: true,
      });
    }

    const embedRule = new EmbedBuilder()
      .setTitle(`Regla #${ruleNumber}`)
      .setThumbnail(interaction.user.client.user.avatarURL())
      .setDescription(
        `\`${guildRule.name}\`\n\n`
        + `_${guildRule.description}_`,
      )
      .setColor('Blue');

    return interaction.reply({
      embeds: [embedRule],
    });
  },
};

export default reglas;
