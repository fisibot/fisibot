import {
  DiscordAPIError, GuildMember, MessageCreateOptions, MessagePayload,
} from 'discord.js';

type MessageToUser = string | MessageCreateOptions | MessagePayload;

// eslint-disable-next-line import/prefer-default-export
export function sendDMToUser(user: GuildMember, message: MessageToUser): DiscordAPIError | null {
  try {
    user.send(message);
  }
  catch (error) {
    if (error instanceof DiscordAPIError) {
      return error;
    }
  }
  return null;
}
