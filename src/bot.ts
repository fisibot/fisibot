import 'dotenv/config';
import { GatewayIntentBits } from 'discord.js';
import { connectToDatabase } from '@services/db/mongo';
import FisibotClient from '@structs/fisibotClient';
import '@services/web/webserver';

async function main() {
  await connectToDatabase();

  const fisiClient = new FisibotClient({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
    ],
  });

  fisiClient.loadEvents();
  fisiClient.login(process.env.CLIENT_TOKEN);
}

if (require.main === module) {
  main();
}
