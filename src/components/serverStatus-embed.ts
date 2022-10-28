import { Client, EmbedBuilder, version } from 'discord.js';
import { getCpuInfo } from '@utils/serverInfo';
import os from 'os';

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
  const totalRAM = os.totalmem();
  const usedRAM = totalRAM - os.freemem();
  const totalRAMGB = (totalRAM / 1024 / 1024).toFixed(2);

  const cpu = await getCpuInfo();
  const OSinfo = `${os.platform()} ${os.release()}`;

  const botUptime = new Date(Date.now() - client.readyAt.getTime());
  const serverUptime = (os.uptime() / 60 / 60).toFixed(2);

  return new EmbedBuilder()
    .setTitle('Fisibot server status')
    .setThumbnail(client.user.avatarURL())
    .setDescription(`${codeBlock(cpu.model)}${codeBlock(OSinfo)}`)
    .addFields(
      {
        name: 'Rendimento',
        value: codeBlock(
          `RAM ${representUsage(totalRAM, usedRAM)} (${totalRAMGB} GB)\n`
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
        value: codeBlock(`${serverUptime} hours`),
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
        name: 'Node.js',
        value: codeBlock(process.version),
      },
    )
    .setFooter({
      text: `Fisibot 1.0.0 | Discord.js ${version}`,
    })
    .setColor('Blue');
}

export default serverStatusEmbed;
