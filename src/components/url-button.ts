import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js';

type URLButtonProps = {
  label: string;
  url: string;
  emoji: string;
};

function URLButton({ label, url, emoji }: URLButtonProps): ActionRowBuilder<ButtonBuilder> {
  const actionRow = new ActionRowBuilder<ButtonBuilder>();
  const button = new ButtonBuilder()
    .setLabel(label)
    .setStyle(ButtonStyle.Link)
    .setURL(url)
    .setEmoji(emoji);

  actionRow.addComponents(button);
  return actionRow;
}
export default URLButton;
