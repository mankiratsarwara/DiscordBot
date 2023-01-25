// Description: The main file for the bot.

// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { getTweetInfo } = require('./twitter/twitterController.js');
const cron = require('node-cron');

// Twitter Variables
let tweeterUsername, tweeterName, tweeterImageURL, tweeterText, tweeterTimestamp = "";

// Create a new client instance.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create a new collection for all commands.
client.commands = new Collection();

// Get all command files from the commands directory
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Load all commands from the commands directory
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// This event is triggered when the client is ready
client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

// This event is triggered when a user runs a command
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Cron job to update the twitter info every 15 minutes.
cron.schedule('*/15 * * * *', async () => {
	try{
		await getTweetInfo().then(function(result){
			if(result['username']){
				tweeterUsername = result['username'];
				tweeterName = result['name'];
				tweeterImageURL = result['imageURL'];
				tweeterText = result['text'];
				tweeterTimestamp = result['timestamp'];	
			}
		});
	}
	catch(err){
		console.log(err);
	}
});

// Login to Discord with your client's token
client.login(token);

// Send the twitter info to the correct channel.
if(tweeterUsername !== undefined || tweeterUsername !== ""){
	
}