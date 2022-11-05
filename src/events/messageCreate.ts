import { APIEmbedField, Events, Message } from 'discord.js';
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
          await collections.registrations?.insertOne(registeredUser);
          message.react('👌');
        }
        catch (error) {
          if (error instanceof MongoServerError) {
            message.reply(`Fatal error when registering: ${error.errmsg}`);
          }
          else {
            message.reply(`Failed to register: ${error}`);
          }
        }
      }
    }
  },
};

export default MessageCreateHandler;
