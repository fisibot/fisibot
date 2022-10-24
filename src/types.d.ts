import { ChatInputCommandInteraction, InteractionResponse } from 'discord.js';

interface ChatCommand {
  name: string;
  description: string;
  options?: Array<unknown>;
  run: (interaction: ChatInputCommandInteraction) => (
    Promise<InteractionResponse<boolean>> | Promise<void>
  );
}
