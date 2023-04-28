import fs from 'fs';
import path from 'path';
import {
  ActivityType, Client, ClientEvents, ClientOptions, Events,
} from 'discord.js';
import { FisiClientEventObject, FisiSlashCommandObject } from '@fisitypes';

export default class FisibotClient extends Client {
  public commands: Record<string, FisiSlashCommandObject>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = {};
    this.once(Events.ClientReady, () => {
      console.log('🙀 Fisibot is running!');
      this.user?.setActivity('@Fisibot', { type: ActivityType.Watching });
    });

    process.on('exit', (code) => {
      console.log(`👋 Fisibot exited with code ${code}`);
      this.destroy();
    });
  }

  loadEvents() {
    const EVENTS_PATH = path.join(__dirname, '..', 'events');
    const eventFiles = fs.readdirSync(EVENTS_PATH);

    eventFiles.forEach(async (eventFile) => {
      const eventHandler = await import(`@events/${eventFile}`) as {
        default: FisiClientEventObject<keyof ClientEvents>
      };
      const eventModule = eventHandler.default;

      // Register event handler
      this.on(eventModule.eventName, eventModule.handle);
    });
  }
}
