import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js';

function registrationButton(): ActionRowBuilder<ButtonBuilder> {
  const actionRow = new ActionRowBuilder<ButtonBuilder>();
  const regbutton1 = new ButtonBuilder()
    .setCustomId('registration-button')
    .setEmoji('1033062991035375666')
    .setLabel('Regístrame')
    .setStyle(ButtonStyle.Primary);

  const regbutton2 = new ButtonBuilder()
    .setCustomId('registration-button-cachimbos')
    .setEmoji('1033579475042054205')
    .setLabel('Registro cachimbos (pronto)')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);

  actionRow.addComponents(regbutton1, regbutton2);
  return actionRow;
}
export default registrationButton;
