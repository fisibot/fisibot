import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import botCommands from './commands'; // dynamically import all commands

const fisiClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

fisiClient.once(Events.ClientReady, () => {
  console.log('🙀 Fisibot is running!');
});

fisiClient.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (botCommands[commandName]) {
    await botCommands[commandName].run(interaction);
  }
  else {
    await interaction.reply({
      content: `Comando no implementado: /${commandName} <:fisiblush:1033579475042054205>`,
      ephemeral: true,
    });
  }
});

fisiClient.login(process.env.CLIENT_TOKEN);
