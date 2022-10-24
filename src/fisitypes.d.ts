import {
  ChatInputCommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';

interface FisiSlashCommandObject {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | SlashCommandSubcommandBuilder;

  run: (interaction: ChatInputCommandInteraction) => (
    Promise<InteractionResponse<boolean>>
  );
}

/**
 * Type for slash (/) command that doesn't have subcommands.
 */
interface FisiSlashCommandWithoutSubcommands extends FisiSlashCommandObject {
  data: SlashCommandBuilder;
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
