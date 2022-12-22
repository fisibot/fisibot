import { Events, GuildMember, UserFlags } from 'discord.js';
import { FisiClientEventObject } from '@fisitypes';

const memberAddHandler: FisiClientEventObject<Events.GuildMemberAdd> = {
  eventName: Events.GuildMemberAdd,
  handle: async (member: GuildMember) => {
    if (member.user.bot) {
      const isVerifiedBot = member.user.flags?.has(UserFlags.VerifiedBot);

      if (isVerifiedBot) {
        const botRole = member.guild.roles.cache.find((role) => role.name === 'Bot' || role.name === 'Bots');
        if (botRole) await member.roles.add(botRole);
        else console.log('Bot joined but no Bot role found.');
      }
      else {
        const unverifiedBotRole = member.guild.roles.cache.find((role) => role.name === 'Cuarentena');
        if (unverifiedBotRole) {
          await member.roles.add(unverifiedBotRole);
          console.log('⚠ ⚠ ⚠ Unverified bot joined and was put in quarantine.');
        }
        else console.log('Unverified bot joined but no Unverified Bot role found.');
      }
    }
  },
};

export default memberAddHandler;
