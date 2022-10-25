import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js';

function registrationButton(): ActionRowBuilder<ButtonBuilder> {
  const actionRow = new ActionRowBuilder<ButtonBuilder>();
  const button = new ButtonBuilder()
    .setCustomId('registration-button')
    .setEmoji('1033579475042054205')
    .setLabel('Regístrame')
    .setStyle(ButtonStyle.Primary);

  actionRow.addComponents(button);
  return actionRow;
}
export default registrationButton;
