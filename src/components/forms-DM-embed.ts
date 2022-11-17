import { EmbedBuilder } from 'discord.js';

function formsMemberDMEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setDescription('Necesitamos recolectar algunos datos para verificarte como estudiante de la FISI\n')
    .setAuthor({
      name: 'Regístrate en el Discord de la FISI',
      iconURL: 'https://media.discordapp.net/attachments/744860318743920711/962177397262811136/9619_GhostWave.gif',
    })
    .setFooter({
      text: 'Usa tu correo institucional',
    })
    .setThumbnail('https://media.discordapp.net/attachments/1033503159575912508/1040428722769100890/google-forms.png')
    .setColor('Blue');
}

export default formsMemberDMEmbed;
