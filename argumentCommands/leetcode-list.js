// Imports
require("dotenv").config();
const leetcode = require("../leetcode-data.json");
const Discord = require("discord.js");
const leetcode_channel = process.env.LEETCODE_CHANNEL;

// List Function
module.exports = function list(message) {
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

    // Split list into sets to send (character limit is only 2048)
    let set1 = [];
    for (let i = 0; i < 25; i++) {
        set1.push(
            "[" +
                leetcode[i].name +
                "]" +
                "(" +
                leetcode[i].url +
                ") - " +
                leetcode[i].difficulty
        );
    }

    let set2 = [];
    for (let i = 25; i < 48; i++) {
        set2.push(
            "[" +
                leetcode[i].name +
                "]" +
                "(" +
                leetcode[i].url +
                ") - " +
                leetcode[i].difficulty
        );
    }

    let set3 = [];
    for (let i = 48; i < 68; i++) {
        set3.push(
            "[" +
                leetcode[i].name +
                "]" +
                "(" +
                leetcode[i].url +
                ") - " +
                leetcode[i].difficulty
        );
    }

    let set4 = [];
    for (let i = 68; i < 89; i++) {
        set4.push(
            "[" +
                leetcode[i].name +
                "]" +
                "(" +
                leetcode[i].url +
                ") - " +
                leetcode[i].difficulty
        );
    }

    let set5 = [];
    for (let i = 88; i < 106; i++) {
        set5.push(
            "[" +
                leetcode[i].name +
                "]" +
                "(" +
                leetcode[i].url +
                ") - " +
                leetcode[i].difficulty
        );
    }

    let set6 = [];
    for (let i = 106; i < 124; i++) {
        set6.push(
            "[" +
                leetcode[i].name +
                "]" +
                "(" +
                leetcode[i].url +
                ") - " +
                leetcode[i].difficulty
        );
    }

    let set7 = [];
    for (let i = 124; i < 141; i++) {
        set7.push(
            "[" +
                leetcode[i].name +
                "]" +
                "(" +
                leetcode[i].url +
                ") - " +
                leetcode[i].difficulty
        );
    }

    let set8 = [];
    for (let i = 141; i < 156; i++) {
        set8.push(
            "[" +
                leetcode[i].name +
                "]" +
                "(" +
                leetcode[i].url +
                ") - " +
                leetcode[i].difficulty
        );
    }

    let set9 = [];
    for (let i = 156; i < 171; i++) {
        set9.push(
            "[" +
                leetcode[i].name +
                "]" +
                "(" +
                leetcode[i].url +
                ") - " +
                leetcode[i].difficulty
        );
    }

    const list1 = new Discord.MessageEmbed()
        .setColor("#FFF")
        .setTitle("List of Curated LeetCode Questions")
        .setDescription(set1.join("\n"));

    const list2 = new Discord.MessageEmbed()
        .setColor("#FFF")
        .setDescription(set2.join("\n"));

    const list3 = new Discord.MessageEmbed()
        .setColor("#FFF")
        .setDescription(set3.join("\n"));

    const list4 = new Discord.MessageEmbed()
        .setColor("#FFF")
        .setDescription(set4.join("\n"));

    const list5 = new Discord.MessageEmbed()
        .setColor("#FFF")
        .setDescription(set5.join("\n"));

    const list6 = new Discord.MessageEmbed()
        .setColor("#FFF")
        .setDescription(set6.join("\n"));

    const list7 = new Discord.MessageEmbed()
        .setColor("#FFF")
        .setDescription(set7.join("\n"));

    const list8 = new Discord.MessageEmbed()
        .setColor("#FFF")
        .setDescription(set8.join("\n"));

    const list9 = new Discord.MessageEmbed()
        .setColor("#FFF")
        .setDescription(set9.join("\n"));

    const info = new Discord.MessageEmbed()
        .setTitle("More Resources for LeetCode")
        .addFields(
            {
                name: "This LeetCode List by Sean Prashad",
                value:
                    "[Visit this Fully Curated List by Sean Prashad on GitHub](https://github.com/SeanPrashad/leetcode-patterns/blob/master/src/data/index.js)",
            },
            {
                name: "Blind 75 Must Do Leetcode",
                value:
                    "[Visit on leetcode.com](https://leetcode.com/list/xi4ci4ig/)",
            }
        );

    try {
        leetcodeChannel.send(list1);
        leetcodeChannel.send(list2);
        leetcodeChannel.send(list3);
        leetcodeChannel.send(list4);
        leetcodeChannel.send(list5);
        leetcodeChannel.send(list6);
        leetcodeChannel.send(list7);
        leetcodeChannel.send(list8);
        leetcodeChannel.send(list9);
        leetcodeChannel.send(info);
    } catch (error) {
        console.log(error);
    }
};
