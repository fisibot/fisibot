import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js';

type URLButtonProps = {
  label: string;
  url: string;
};

function URLButton({ label, url }: URLButtonProps): ActionRowBuilder<ButtonBuilder> {
  const actionRow = new ActionRowBuilder<ButtonBuilder>();
  const button = new ButtonBuilder()
    .setLabel(label)
    .setStyle(ButtonStyle.Link)
    .setURL(url)
    .setEmoji('<:googleforms:1040432625162129428>');

  actionRow.addComponents(button);
  return actionRow;
}
export default URLButton;
