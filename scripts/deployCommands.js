require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);

// In order to import the commands, we need to first build by running `npm run build`
// (this is because we can't import from TypeScript, so `commands` needs to be compiled)

const COMMANDS_PATH = path.join(__dirname, '../build/commands');
const EXCLUDE_FILES = ['index.js'];

const isCommandFile = (file) => file.endsWith('.js') && !EXCLUDE_FILES.includes(file);

// Read all the commands files
const commandFileNames = fs.readdirSync(COMMANDS_PATH).filter(isCommandFile);

// Dynamically import all the commands
const commandImportPromises = commandFileNames.map((command) => import(
  path.join(COMMANDS_PATH, command)
));

// Wait for all the commands to be resolved
Promise.allSettled(commandImportPromises).then(async (commandModules) => {
  const botCommands = commandModules.map((commandModule) => {
    const defaultExport = commandModule.value.default.default;
    // Extract run() command function
    const { run, ...commandObject } = defaultExport;
    return commandObject;
  });

  // Start deploying the commands
  // See https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration

  console.log(`🐢 Started refreshing ${botCommands.length} application (/) commands:`);
  botCommands.forEach((command) => console.log(` - /${command.name}`));

  try {
    const data = await rest.put(
      Routes.applicationCommands(process.env.APPLICATION_ID),
      { body: botCommands },
    );
    console.log(`\n✅ Successfully registered ${data.length} application (/) commands.`);
  }
  catch (error) {
    console.log('\n❌ Error registering application (/) commands:');
    console.error(error);
  }
}).catch(console.error);
