import {
  APIEmbedField, DiscordAPIError, EmbedBuilder, Events, GuildMember, Message,
} from 'discord.js';
import { FisiClientEventObject } from '@fisitypes';
import RegisteredMember from '@services/db/models/registeredMember';
import { collections } from '@services/db/mongo';
import { MongoServerError } from 'mongodb';

function parseEmbedFieldsToJSON(fields: APIEmbedField[]) {
  const obj: { [key: string]: any } = {};
  fields.forEach((field) => {
    obj[field.name] = field.value;
  });
  return obj;
}

const MessageCreateHandler: FisiClientEventObject<Events.MessageCreate> = {
  eventName: Events.MessageCreate,
  handle: async (message: Message) => {
    if (!message.webhookId) return;

    const webhookMessage = message; // rename for clarity

    if (message.content === '`#!fisibot/registrations`') {
      const { fields } = webhookMessage.embeds[0];
      const registeredUser = parseEmbedFieldsToJSON(fields) as RegisteredMember;
      registeredUser.base = Number(registeredUser.base); // base del alumno

      let newMember: GuildMember | undefined;

      try {
        // Try to find the member in the guild
        // See https://www.reddit.com/r/Discordjs/comments/slgr4v/how_do_cache_and_fetch_work_and_what_is_the/
        newMember = (
          await webhookMessage.guild?.members?.fetch(registeredUser.discordId) as GuildMember
        );

        const { VERIFIED_ROLE_ID } = process.env;

        // Give the user the verified role
        // Issues I encountered:
        // 1. The user is not in the guild
        // 2. Missing Permissions: https://stackoverflow.com/q/62360928
        await newMember.roles.add(VERIFIED_ROLE_ID!);

        webhookMessage.react('👌');

        const { WELCOME_CHANNEL_ID } = process.env;
        const welcomeChannel = webhookMessage.guild?.channels.cache.get(WELCOME_CHANNEL_ID!);

        if (welcomeChannel && welcomeChannel.isTextBased()) {
          const welcomeMessage = await welcomeChannel.send({
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  `<@!${newMember.id}> ha superado todas nuestras pruebas y ha aparecido en el servidor!!`,
                )
                .setAuthor({
                  name: 'Nuevo miembro!!! 🎉',
                  iconURL: 'https://media.discordapp.net/attachments/744860318743920711/962177397262811136/9619_GhostWave.gif',
                })
                .setThumbnail(newMember.user.displayAvatarURL())
                .setColor('Blue'),
            ],
          });
          welcomeMessage.react('👋');
        }

        // Save user to db
        await collections.registrations?.insertOne(registeredUser);
      }
      catch (error) {
        let errorMessage: string;

        // Try to figure out what went wrong
        if (error instanceof DiscordAPIError) {
          errorMessage = newMember
            ? `API error when registering: ${error}`
            : `Can't fetch user: ${error}`;
        }
        else if (error instanceof MongoServerError) {
          // Mongo fails, but we have fetched the user
          errorMessage = `User registered, but could not be saved to DB: ${error.errmsg}`;
          // react with warning
          webhookMessage.react('⚠️');
        }
        else {
          errorMessage = `Unknown error when registering: ${error}`;
        }

        // Send error feedback to the user
        try {
          newMember!.send(
            'El equipo de FisiBot ha sufrido un problema (nuestro) al registrarte.\n\n'
            + 'Estamos (_claramente_) solucionando el problema, pero mientras tanto, '
            + 'puedes contactar a un administrador para que te registre manualmente.',
          );
          errorMessage += `. DM feedback webhookMessage sent to \`${newMember?.user.tag}\``;
        }
        catch (_error) {
          errorMessage += `. Could not send DM to \`${registeredUser.discordId}\``;
        }
        // Send error feedback to the channel
        webhookMessage.reply(errorMessage);
        webhookMessage.react('❌');
      }
    }
  },
};

export default MessageCreateHandler;
