import { Events, GuildMember } from 'discord.js';
import { FisiClientEventObject } from '@fisitypes';

const memberAddHandler: FisiClientEventObject<Events.GuildMemberAdd> = {
  eventName: Events.GuildMemberAdd,
  handle: async (member: GuildMember) => {
    if (member.user.bot) {
      const botRole = member.guild.roles.cache.find((role) => role.name === 'Bot');
      if (botRole) await member.roles.add(botRole);
      else console.log('Bot joined but no Bot role found.');
    }
  },
};

export default memberAddHandler;
