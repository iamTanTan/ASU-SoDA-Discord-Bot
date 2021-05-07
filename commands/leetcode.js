let leetcode = require("../leetcode-data.json");
const Discord = require("discord.js");
const leetcodeLister = require("../argumentCommands/leetcode-list");
const leetcodeHelp = require("../argumentCommands/leetcode-help");
const leetcode_channel = process.env.LEETCODE_CHANNEL;

module.exports = {
    name: "!leetcode",
    description: "Bot for LeetCode questions",

    execute(message, args) {
        /***************************************************  Validate Channel ***************************************************/

        let leetcodeChannel = message.guild.channels.cache.get(
            leetcode_channel
        );
        if (!leetcodeChannel) {
            message.channel.send(
                `Sorry, it seems there is no leetcode_channel on this server ${message.author}, Go ahead and create one in config.json`
            );
            return;
        }
        if (message.channel.name != leetcodeChannel.name) {
            message.delete();
            message.channel.send(
                `Please use the leetcode channel ${message.author}.`
            );
            return;
        }

        var strcmp = (a, b) => {
            return a < b ? -1 : a > b ? 1 : 0;
        };

        /*************************************************** Sends List of all questions /***************************************************/
        if (args[0] == "list") {
            leetcodeLister(message);
        } else if (args[0] == "help") {
            leetcodeHelp(message);
        } else {
            /********************************************** Send Single Leetcode Question *********************************************/

            // Check request argument for premium requirements
            if (args[1] == "true") isPremium = true;
            else isPremium = false;

            // Get initial random leetcode question id
            let id = Math.floor(Math.random() * Math.floor(leetcode.length));

            if (!args[0]) {
                // Do not select any specific difficulty if no args
            } else {
                // Check to make sure argument conditions are satisfied
                if (
                    strcmp(args[0].toLowerCase(), "easy") == 0 ||
                    strcmp(args[0].toLowerCase(), "medium") == 0 ||
                    strcmp(args[0].toLowerCase(), "hard") == 0
                )
                    while (
                        leetcode[id].difficulty.toLowerCase() !=
                            args[0].toLowerCase() ||
                        leetcode[id].premium != isPremium
                    ) {
                        id = Math.floor(
                            Math.random() * Math.floor(leetcode.length)
                        );
                    }
                else {
                    message.channel.send(
                        'Command is invalid! Use "!leetcode help" for a list of available commands'
                    );
                    return;
                }
            }

            // Retrieve the current premium status of the question to display in embed
            let premiumStatus;
            if (leetcode[id].premium) {
                premiumStatus = "Yes";
            } else {
                premiumStatus = "No";
            }

            // Set Color Based on Difficulty of a problem
            let color;
            if (leetcode[id].difficulty.toLowerCase() == "easy") {
                color = "#00FF00";
            } else if (leetcode[id].difficulty.toLowerCase() == "medium") {
                color = "#FFFF00";
            } else color = "#FF0000";

            /*********************************************** Create Embed for leetcode Question ***************************************************/
            const question = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(leetcode[id].name)
                .setURL(leetcode[id].url)
                .setThumbnail(
                    "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                )
                .addFields(
                    {
                        name: "Difficulty",
                        value: leetcode[id].difficulty,
                        inline: true,
                    },
                    {
                        name: "Pattern",
                        value: leetcode[id].pattern,
                        inline: true,
                    },
                    {
                        name: "\u200B",
                        value: "\u200B",
                    },
                    {
                        name: "Companies",
                        value: leetcode[id].companies,
                        inline: true,
                    },
                    {
                        name: "Premium",
                        value: premiumStatus,
                        inline: true,
                    }
                );

            /*************************************************** Send Embed ***************************************************/
            try {
                leetcodeChannel.send(question);
            } catch (error) {
                console.log(error);
            }
        }
    },
};
