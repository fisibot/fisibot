import {
  ChatInputCommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from 'discord.js';

interface ChatApplicationCommand {
  data: SlashCommandBuilder;

  run: (interaction: ChatInputCommandInteraction) => (
    Promise<void> | Promise<InteractionResponse<boolean>>
  );
}

interface ChatApplicationCommandWithSubcommands {
  data: SlashCommandSubcommandsOnlyBuilder;

  run: (interaction: ChatInputCommandInteraction) => (
    Promise<void> | Promise<InteractionResponse<boolean>>
  );
}

interface ChatApplicationSubcommand {
  data: SlashCommandSubcommandBuilder;

  run: (interaction: ChatInputCommandInteraction) => (
    Promise<void> | Promise<InteractionResponse<boolean>>
  );
}
