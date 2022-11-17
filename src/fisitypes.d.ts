import {
  ChatInputCommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  ClientEvents,
  Awaitable,
} from 'discord.js';

// Slash commands 🐢

interface FisiSlashCommandObject {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | SlashCommandSubcommandBuilder;
  run: (interaction: ChatInputCommandInteraction) => (
    Promise<InteractionResponse<boolean> | void>
  );
}

/**
 * Type for slash (/) command that doesn't have subcommands.
 */
interface FisiSlashCommandWithoutSubcommands extends FisiSlashCommandObject {
  data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
}

/**
 * Type for Slash (/) command that have subcommands.
 */
interface FisiSlashCommandWithSubcommands extends FisiSlashCommandObject {
  data: SlashCommandSubcommandsOnlyBuilder;
}

/**
 * Type for Slash (/) subcommands.
 */
interface FisiSlashSubcommand extends FisiSlashCommandObject {
  data: SlashCommandSubcommandBuilder;
}

// Events 🐢

interface FisiClientEventObject<E extends keyof ClientEvents> {
  eventName: E;
  handle: (...args: ClientEvents[E]) => Awaitable<void>
}
