import fs from 'fs';
import path from 'path';
import { Client, ClientOptions } from 'discord.js';
import { FisiClientEventObject, FisiSlashCommandObject } from '@fisitypes';

export default class FisibotClient extends Client {
  public commands: Record<string, FisiSlashCommandObject>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = {};
    this.loadEvents();
    this.once('ready', () => console.log('🙀 Fisibot is running!'));
  }

  loadEvents() {
    const EVENTS_PATH = path.join(__dirname, '..', 'events');
    const eventFiles = fs.readdirSync(EVENTS_PATH);

    eventFiles.forEach(async (eventFile) => {
      const eventHandler = await import(path.join(EVENTS_PATH, eventFile)) as {
        default: FisiClientEventObject
      };
      const eventModule = eventHandler.default;

      this.on(eventModule.eventName, eventModule.handle);
    });
  }
}
