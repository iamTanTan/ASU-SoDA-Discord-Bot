// Imports
require("dotenv").config();
const Discord = require("discord.js");
const leetcode_channel = process.env.LEETCODE_CHANNEL;

// Help function
module.exports = function help(message) {
    let leetcodeChannel = message.guild.channels.cache.get(leetcode_channel);
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

    const usage =
        "\n**!leetcode** : retrieves a random LeetCode question\n" +
        "\n**!leetcode list** : displays all available LeetCode questions in \n" +
        "\n**!leetcode hard** : retrieves a hard difficulty LeetCode question (easy, medium, hard)\n" +
        "\n**!leetcode easy true** : retrieves an easy premium question (true: premium, false: not premium) \n";

    const helpEmbed = new Discord.MessageEmbed()
        .setColor("#0FF")
        .setTitle(`LeetCode Bot`)
        .setDescription(
            "Bot for LeetCode questions that retrieves LeetCode questions and delivers a daily question to the channel"
        )
        .setThumbnail(
            "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
        )
        .addFields({
            name: "Request LeetCode Question",
            value: "\n**Usage:** !leetcode \n" + usage,
        });

    try {
        message.channel.send(helpEmbed);
    } catch (error) {
        console.log(error);
    }
};
