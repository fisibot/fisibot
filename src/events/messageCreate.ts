import {
  APIEmbedField, DiscordAPIError, Events, Message,
} from 'discord.js';
import { FisiClientEventObject } from '@fisitypes';
import RegisteredMember from '@services/db/models/registeredMember';
import { collections } from '@services/db/mongo';
import { MongoServerError } from 'mongodb';

function parseFieldsToJSON(fields: APIEmbedField[]) {
  const obj: { [key: string]: any } = {};
  fields.forEach((field) => {
    obj[field.name] = field.value;
  });
  return obj;
}

const MessageCreateHandler: FisiClientEventObject<Events.MessageCreate> = {
  eventName: Events.MessageCreate,
  handle: async (message: Message) => {
    if (message.webhookId) {
      if (message.content === '`#!fisibot/registrations`') {
        const { fields } = message.embeds[0];
        const registeredUser = parseFieldsToJSON(fields) as RegisteredMember;
        registeredUser.base = Number(registeredUser.base);

        try {
          console.log('registering...', registeredUser);
          const { VERIFIED_ROLE_ID } = process.env;
          // Save user to db
          await collections.registrations?.insertOne(registeredUser);

          // Give the user the verified role
          // Issues I encountered:
          // 1. The user is not in the guild
          // 2. Missing Permissions: https://stackoverflow.com/q/62360928
          const newMember = await message.guild?.members.fetch(registeredUser.discordId);
          await newMember?.roles.add(VERIFIED_ROLE_ID!);
          message.react('👌');
        }
        catch (error) {
          if (error instanceof MongoServerError) {
            message.reply(`Server error when registering: ${error.errmsg}`);
            message.react('❌');
          }
          if (error instanceof DiscordAPIError) {
            message.reply(`API error when registering: ${error}`);
            message.react('❌');
          }
          else {
            message.reply(`Unknown error when registering: ${error}`);
            console.error(error);
            message.react('❌');
          }
        }
      }
    }
  },
};

export default MessageCreateHandler;
