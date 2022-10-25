import {
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

function registrationModal(): ModalBuilder {
  const modal = new ModalBuilder();
  modal.setTitle('Regístrate para acceder a la FISI');
  modal.setCustomId('registration-form');

  const fullnameInput = new TextInputBuilder()
    .setCustomId('fullname')
    .setLabel('Nombre completo')
    .setPlaceholder('Nombre completo')
    .setMinLength(5)
    .setMaxLength(100)
    .setStyle(TextInputStyle.Short);

  const studentCodeInput = new TextInputBuilder()
    .setCustomId('studentCode')
    .setLabel('Código de estudiante')
    .setPlaceholder('Código de estudiante')
    .setMinLength(8)
    .setMaxLength(8)
    .setStyle(TextInputStyle.Short);

  // An action row only holds one text input,
  // so you need one action row per text input.
  const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>()
    .addComponents(fullnameInput);
  const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>()
    .addComponents(studentCodeInput);

  // Add inputs to the modal
  modal.addComponents(firstActionRow, secondActionRow);
  return modal;
}
export default registrationModal;
