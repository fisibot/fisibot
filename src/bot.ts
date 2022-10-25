import 'dotenv/config';
import { GatewayIntentBits } from 'discord.js';
import FisibotClient from '@structs/fisibotClient';

const fisiClient = new FisibotClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

fisiClient.login(process.env.CLIENT_TOKEN);
