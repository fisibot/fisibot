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
      .setRequired(true)),

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
        content: 'Usted ha ingresado una regla inválida que puede explotar el servidor',
        ephemeral: true,
      });
    }
    const ruleIndex = ruleNumber - 1;
    const guildRule = guild.serverRules[ruleIndex];

    if (!guildRule) {
      return interaction.reply({
        content: `La regla ${ruleNumber} aún no ha sido escrita por los dioses`,
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
