require("dotenv").config();

const fs = require("fs");

const TOKEN = process.env.TOKEN;
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const prefix = "!";

// Retrieve bot commands
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

// Add files into commands collection
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on("ready", () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (message) => {
    // Check for bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Split message content to get command called
    const args = message.content.split(/ +/);
    const command = args.shift().toLowerCase();
    console.info(`Called command: ${command}`);

    if (!bot.commands.has(command)) return;

    try {
        bot.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
    }
});

bot.login(TOKEN);
