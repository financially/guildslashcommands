const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Instance
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'cmd') {
    await interaction.reply('working');
  }
});

client.login(token);

const commands = [
  {
    name: 'cmd',
    description: 'working',
  },
];

const rest = new REST({ version: '10' }).setToken(token);

// Output
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
