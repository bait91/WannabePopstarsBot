const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsFile = files.filter(f => f.split(".").pop() === "js")
    if (jsFile.length <= 0) {
        console.log("No file found");

    }

    jsFile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});


bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Penish");
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if(commandFile) commandFile.run(bot, message, args);

    // if (cmd === `${prefix}hello`) {
    //     return message.channel.send("Hello " + message.author.username);
    // }
    //
    // if (cmd === `${prefix}serverinfo`) {
    //     let sicon = message.guild.iconURL;
    //     let serverembed = new Discord.RichEmbed()
    //         .setDescription("Server Information")
    //         .setColor("#f44242")
    //         .setThumbnail(sicon)
    //         .addField("Server Name", message.guild.name)
    //         .addField("Total Members", message.guild.memberCount);
    //
    //     return message.channel.send(serverembed);
    // }

});

bot.login(botconfig.token);