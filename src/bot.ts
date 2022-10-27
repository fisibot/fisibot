import 'dotenv/config';
import { GatewayIntentBits } from 'discord.js';
import { connectToDatabase } from '@services/mongo';
import FisibotClient from '@structs/fisibotClient';

const fisiClient = new FisibotClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

(async () => {
  await connectToDatabase();
})();

fisiClient.login(process.env.CLIENT_TOKEN);
