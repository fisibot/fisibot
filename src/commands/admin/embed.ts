import {
  ChatInputCommandInteraction, SlashCommandSubcommandBuilder,
  ActionRowBuilder, ButtonBuilder, ButtonStyle,
} from 'discord.js';
import { FisiSlashSubcommand } from '@fisitypes';

const embedSubcommand: FisiSlashSubcommand = {
  data: new SlashCommandSubcommandBuilder()
    .setName('embed')
    .setDescription('Haz que el fisibot envíe un mensaje por ti')
    .addStringOption((JSON_embed) => JSON_embed
      .setName('json-embed')
      .setDescription('Embed en formato JSON, recomendamos usar https://discohook.org/')
      .setRequired(true)),

  run: async (interaction: ChatInputCommandInteraction) => {
    const embed = interaction.options.getString('json-embed') as string;

    let embedJSON: {};
    try {
      embedJSON = JSON.parse(embed);
    }
    catch {
      return interaction.reply({
        embeds: [{
          description: ':crying_cat_face: — El embed que has enviado no es válido\n\n'
            + 'Psst, prueba con este [renderizador de embeds](https://discohook.org/) y recuerda pegarlo en formato JSON\n',
        }],
        ephemeral: true,
      });
    }

    const actionRow = new ActionRowBuilder<ButtonBuilder>();
    const confirmButton = new ButtonBuilder()
      .setCustomId('confirm-send-embed-button')
      .setEmoji('✅')
      .setLabel('Confirmar y enviar')
      .setStyle(ButtonStyle.Primary);

    actionRow.addComponents(confirmButton);

    return interaction.reply({
      ...embedJSON,
      components: [actionRow],
      ephemeral: true,
    });
  },
};

export default embedSubcommand;
