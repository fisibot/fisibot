import { Client, EmbedBuilder, version } from 'discord.js';
import { getCPUInfo, getRAMInfo, getPCInfo } from '@utils/serverInfo';

const codeBlock = (content: string) => `\`\`\`${content}\`\`\``;

const representUsage = (total: number, used: number) => {
  const fill = '■';
  const empty = '□';
  const blocks = 15;

  const freeBar = fill.repeat(Math.round((used / total) * blocks));
  const emptyBar = empty.repeat(blocks - freeBar.length);
  const percentage = ((used / total) * 100).toFixed(2);

  return `${freeBar}${emptyBar} ${percentage}%`;
};

async function serverStatusEmbed(client: Client<true>): Promise<EmbedBuilder> {
  const cpu = await getCPUInfo();
  const ram = getRAMInfo();
  const pc = getPCInfo();

  const botUptime = new Date(Date.now() - client.readyAt.getTime());

  return new EmbedBuilder()
    .setTitle('Fisibot server status')
    .setThumbnail(client.user.avatarURL())
    .setDescription(`${codeBlock(cpu.model)}${codeBlock(pc.OS)}`)
    .addFields(
      {
        name: 'Rendimento',
        value: codeBlock(
          `RAM ${representUsage(ram.total, ram.used)} (${ram.totalGB} GB)\n`
          + `CPU ${representUsage(100, cpu.usage)}`,
        ),
      },
      {
        name: 'CPU cores',
        value: codeBlock(cpu.cores.toString()),
        inline: true,
      },
      {
        name: 'Server Uptime',
        value: codeBlock(`${pc.uptime} hours`),
        inline: true,
      },
      {
        name: 'Bot Uptime',
        value: codeBlock(
          `${botUptime.getUTCHours()}h ${botUptime.getMinutes()}m ${botUptime.getSeconds()}s`,
        ),
        inline: true,
      },
      {
        name: 'Runtime',
        value: codeBlock(`Node.js ${process.version}`),
      },
    )
    .setFooter({
      text: `Fisibot 1.0.0 | Discord.js ${version}`,
    })
    .setColor('Blue');
}

export default serverStatusEmbed;
