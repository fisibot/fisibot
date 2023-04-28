import {
  DiscordAPIError, GuildMember, MessageCreateOptions, MessagePayload,
} from 'discord.js';

type MessageToUser = string | MessageCreateOptions | MessagePayload;

// eslint-disable-next-line import/prefer-default-export
export async function sendDMToUser(user: GuildMember, message: MessageToUser) {
  try {
    if (typeof message === 'string') {
      await user.send({
        embeds: [{ description: message }],
      });
    }
    else {
      await user.send(message);
    }
  }
  catch (error) {
    if (error instanceof DiscordAPIError) {
      return error;
    }
  }
  return null;
}
