import {
  APIEmbedField, DiscordAPIError, Events, GuildMember, Message,
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

        let newMember: GuildMember | undefined;

        try {
          // Try to find the member in the guild
          // See https://www.reddit.com/r/Discordjs/comments/slgr4v/how_do_cache_and_fetch_work_and_what_is_the/
          newMember = await message.guild?.members.fetch(registeredUser.discordId);

          console.log('registering...', registeredUser);
          const { VERIFIED_ROLE_ID } = process.env;

          // Save user to db
          await collections.registrations?.insertOne(registeredUser);

          // Give the user the verified role
          // Issues I encountered:
          // 1. The user is not in the guild
          // 2. Missing Permissions: https://stackoverflow.com/q/62360928
          await newMember?.roles.add(VERIFIED_ROLE_ID!);
          message.react('👌');
          newMember!.send(
            'Bienvenido al Discord de la FISI!!!\n\n'
            + 'Has desbloqueado todo el servidor, gracias por registrarte.\n'
            + '`#ProyectoDiscordDeLaFISI`',
          ).catch(() => {});
        }
        catch (error) {
          let errorMessage: string;

          if (error instanceof DiscordAPIError) {
            errorMessage = newMember
              ? `API error when registering: ${error}`
              : `Can't fetch user: ${error}`;
          }
          else if (error instanceof MongoServerError) {
            // Mongo fails, but we have fetched the user
            errorMessage = `Server error when registering: ${error.errmsg}`;
          }
          else {
            errorMessage = `Unknown error when registering: ${error}`;
            console.error(error);
          }
          try {
            // Send error feedback to the user
            newMember!.send(
              'El equipo de FisiBot ha sufrido un problema (nuestro) al registrarte.\n\n'
              + 'Estamos (_claramente_) solucionando el problema, pero mientras tanto, '
              + 'puedes contactar a un administrador para que te registre manualmente.',
            );
            errorMessage += `. DM sent to \`${newMember?.user.tag}\``;
          }
          catch (_error) {
            errorMessage += `. Could not send DM to \`${registeredUser.discordId}\``;
          }
          message.reply(errorMessage);
          message.react('❌');
        }
      }
    }
  },
};

export default MessageCreateHandler;
