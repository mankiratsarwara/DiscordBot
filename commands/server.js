// This command will provide information about the server in which it was run.
// Path: commands\server.js

// This command will provide information about the server in which it was run.
const { SlashCommandBuilder } = require('discord.js');

// Export the command data and the execute function
module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};