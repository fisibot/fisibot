import {
  ChatInputCommandInteraction, SlashCommandSubcommandBuilder,
  Message, TextBasedChannel, ChannelType,
} from 'discord.js';
import { FisiSlashSubcommand } from '@fisitypes';

const editEmbedSubcommand: FisiSlashSubcommand = {
  data: new SlashCommandSubcommandBuilder()
    .setName('edit-embed')
    .setDescription('Edita algún mensaje que haya enviado Fisibot')
    .addStringOption((messageLink) => messageLink
      .setName('message-link')
      .setDescription('Link del mensaje `https://discord.com/channels/<server_id>/<channel_id>/<message_id>`')
      .setRequired(true))
    .addStringOption((JSON_embed) => JSON_embed
      .setName('json-embed')
      .setDescription('Embed en formato JSON, recomendamos usar https://discohook.org/')
      .setRequired(true)),

  run: async (interaction: ChatInputCommandInteraction) => {
    const messageLink = interaction.options.getString('message-link') as string;
    const splitedURL = messageLink.split('/');
    const messageId = splitedURL.pop();
    const channelId = splitedURL.pop();
    const guildId = splitedURL.pop();

    if (!guildId || !channelId || !messageId) {
      return interaction.reply({
        embeds: [{
          description: `\`${messageLink}\` no es un link válido para un mensaje\n\n`
            + 'Recuerda usar alguna de las siguientas formas:\n'
            + '`https://discord.com/channels/<server_id>/<channel_id>/<message_id>`\n'
            + '`<server_id>/<channel_id>/<message_id>`',
        }],
        ephemeral: true,
      });
    }

    if (guildId !== interaction.guildId) {
      return interaction.reply({
        embeds: [{ description: 'Error: El mensaje que has enviado no es de este servidor' }],
        ephemeral: true,
      });
    }

    let channelToSend: TextBasedChannel;
    try {
      channelToSend = (
        await interaction.guild?.channels.cache.get(channelId)?.fetch(true)
      ) as TextBasedChannel;
    }
    catch {
      return interaction.reply({
        embeds: [{ description: 'Error: El link del mensaje no pudo ser encontrado' }],
        ephemeral: true,
      });
    }

    if (!channelToSend) {
      return interaction.reply({
        embeds: [{ description: 'Error: El canal del mensaje que has enviado no existe' }],
        ephemeral: true,
      });
    }

    // Check if channel is a text based channel
    if (
      channelToSend.type !== ChannelType.GuildText
      && channelToSend.type !== ChannelType.GuildAnnouncement
      && channelToSend.type !== ChannelType.GuildVoice
      && channelToSend.type !== ChannelType.PublicThread
      && channelToSend.type !== ChannelType.PrivateThread
    ) {
      return interaction.reply({
        embeds: [{ description: 'Error: El tipo de canal del mensaje que has enviado no es de texto' }],
        ephemeral: true,
      });
    }

    let messageToEdit: Message;
    try {
      messageToEdit = await channelToSend.messages.fetch(messageId);
    }
    catch {
      return interaction.reply({
        embeds: [{ description: 'Error: No podemos obtener el mensaje' }],
        ephemeral: true,
      });
    }
    const embed = interaction.options.getString('json-embed') as string;

    let embedJSON: {};
    try {
      embedJSON = JSON.parse(embed);
    }
    catch {
      return interaction.reply({
        embeds: [{
          description: '😿 — El embed que has enviado no es válido\n\n'
              + 'Psst, prueba con este [renderizador de embeds](https://discohook.org/) y recuerda pegarlo en formato JSON\n',
        }],
        ephemeral: true,
      });
    }

    try {
      await messageToEdit.edit({ ...embedJSON });
    }
    catch (error) {
      console.error({ error });
      return interaction.reply({
        embeds: [{ description: '❌ — No se ha podido editar el mensaje' }],
        ephemeral: true,
      });
    }
    return interaction.reply({
      embeds: [{ description: '✅ — El mensaje se ha editado correctamente' }],
      ephemeral: true,
    });
  },
};

export default editEmbedSubcommand;
