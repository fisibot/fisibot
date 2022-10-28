require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');

// Reigster the commands at src/commands to the Discord API
// See https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands

async function main() {
  const { CLIENT_TOKEN, APPLICATION_ID } = process.env;

  if (!CLIENT_TOKEN) {
    throw new Error('Please define the CLIENT_TOKEN environment variable inside .env');
  }
  const rest = new REST({ version: '10' }).setToken(CLIENT_TOKEN);

  const COMMANDS_PATH = path.join(__dirname, '../build/commands');
  const isCommandFolder = (file) => !file.endsWith('.js');

  // Read all the commands files
  const commandFolderNames = fs.readdirSync(COMMANDS_PATH).filter(isCommandFolder);

  // Dynamically import all the commands
  const commandImportPromises = commandFolderNames.map((command) => {
    const commandFileName = `${command}.js`;
    return import(path.join(COMMANDS_PATH, command, commandFileName));
  });

  // Wait for all the commands to be resolved
  Promise.allSettled(commandImportPromises).then(async (commandModules) => {
    const botCommands = commandModules.map((commandModule) => {
      const defaultExport = commandModule.value.default.default;
      return defaultExport.data.toJSON(); // <-- This is the command JSON REST Post data
    });

    // Start deploying the commands
    // See https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration

    console.log(`🐢 Started refreshing ${botCommands.length} application (/) commands:`);
    botCommands.forEach((command) => console.log(` - /${command.name}`));

    try {
      const data = await rest.put(
        Routes.applicationCommands(APPLICATION_ID),
        { body: botCommands },
      );
      console.log(`\n✅ Successfully registered ${data.length} application (/) commands.`);
    }
    catch (error) {
      console.log('\n❌ Error registering application (/) commands:');
      console.error(error);
    }
  }).catch(console.error);
}

if (require.main === module) {
  main();
}
