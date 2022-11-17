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

  const botUptime = {
    seconds: Math.floor(client.uptime / 1000) % 60,
    minutes: Math.floor(client.uptime / 1000 / 60) % 60,
    hours: Math.floor(client.uptime / 1000 / 60 / 60),
  };

  const { RAILWAY_GIT_COMMIT_MESSAGE, RENDER_GIT_COMMIT, RAILWAY_GIT_COMMIT_SHA } = process.env;

  const COMMIT_SHA = RENDER_GIT_COMMIT || RAILWAY_GIT_COMMIT_SHA;
  const COMMIT_URL = `https://github.com/fisibot/fisibot/commit/${COMMIT_SHA}`;

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
        value: codeBlock(`${botUptime.hours}h ${botUptime.minutes}m ${botUptime.seconds}s`),
        inline: true,
      },
      {
        name: 'Commit deployed',
        value: `<:github:1042897846283796503>︱[${RAILWAY_GIT_COMMIT_MESSAGE ?? COMMIT_SHA}](${COMMIT_URL})`,
      },
    )
    .setFooter({
      text: `ㅤ\nFisibot 1.0.0 | Discord.js ${version} | Node.js ${process.version}`,
    })
    .setColor('Blue');
}

export default serverStatusEmbed;
