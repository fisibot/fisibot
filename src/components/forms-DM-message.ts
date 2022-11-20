import { EmbedBuilder } from 'discord.js';
import URLButton from '@components/url-button';

function formsMemberDMEmbed({ user_id }: { user_id: string }) {
  const { REGISTRATION_FORM_URL, FORM_ENTRY_DISCORD_ID_ITEM } = process.env;
  const formsButton = URLButton({
    label: 'Formulario de registro',
    url: `${REGISTRATION_FORM_URL}?entry.${FORM_ENTRY_DISCORD_ID_ITEM}=${user_id}`,
    emoji: '<:googleforms:1040432625162129428>',
  });

  return {
    formsButton,
    formsEmbed: new EmbedBuilder()
      .setDescription(
        'Completa el siguiente **formulario** para verificarte como **estudiante de la FISI**\n\n'
      + `・ Esta es tu ID de Discord: \`${user_id}\`\n`
      + '・ Utiliza tu correo institucional\n\n',
      )
      .setAuthor({
        name: 'Regístrate en el Discord de la FISI',
        iconURL: 'https://media.discordapp.net/attachments/744860318743920711/962177397262811136/9619_GhostWave.gif',
      }) // wave animation
      .setThumbnail(
        'https://lh6.googleusercontent.com/saZrjwbbwafGKzPTU_9lWePkGWYLAy6B1ZVP3mg1XzAgqvgL_kFviU-UEL_89GmIRkw=w2400',
      ) // google forms logo
      .setColor('Blue'),
  };
}

export default formsMemberDMEmbed;
