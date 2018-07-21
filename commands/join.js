const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (message.member.voiceChannel) {
        message.member.voiceChannel.join().then(connection => {
            message.reply(message.client.user.username + " Successfully joined!");
        });
    } else {
        message.reply("You must be in a voice channel!");
    }


    // return message.channel.send("Hello " + message.author.username);
};


module.exports.help = {
    name: "join"
};