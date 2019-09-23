const { Client } = require('discord.js')
const path = require('path')
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    console.log(`(SYSTEM) Zarządca Jest gotowy do pracy`);
    client.user.setActivity(`Użytkownicy ${client.users.size} | v0.1`);
    
    client.channels.get("625757418957045764").setName(`📑┃Serwery: ${client.guilds.size}/1`)
    client.channels.get("625758651830894597").setName(`📑┃Użytkownicy: ${client.users.size}`)

})

// Komenda z!ping

client.on("message", async msg => {

    if (msg.author.bot) return;
    if (msg.channel.type !== "text") return;
    if (msg.content.startsWith(config.prefix + "ping")){
        var pv = new Discord.RichEmbed()
            .setTitle(`@${msg.author.tag} Pong!`)
            .setDescription(`:ping_pong: **Twój ping to ${Math.round(client.ping)}ms**`)
            .setColor("RANDOM")
            .setFooter(`@${msg.author.tag} Sprawdził swój ping!`)
            msg.channel.send(pv);
    }
})

// Komenda z!dm

const prefix = "z!";
client.on ("message", (message) => {


    msg = message.content.toLowerCase();

    if (message.author.bot) return;
    
    mention = message.mentions.users.first();

    if (msg.startsWith (prefix + "dm")) {
        if (mention == null) { return; }
        message.delete();
        mentionMessage = message.content.slice (4);
        mention.sendMessage (mentionMessage);
        message.channel.send ("Wysłano!")
    }
})

// Nadawanie rangi po wejściu użytkownika na serwer.

client.on ("guildMemberAdd", member => {  

    var role = member.guild.roles.find ("name", "[RHINO] MEMBER");
    member.addRole (role);
    var role = member.guild.roles.find ("name", "╠-● POWIADOMIENIA");
    member.addRole (role);
    var role = member.guild.roles.find ("name", "╠-● UŻYTKOWNIK");
    member.addRole (role);
})

client.on ("guildMemberRemove", member => {

})  

// Wiadomość powitalna.

client.on("guildMemberAdd", function(member){
    member.guild.channels.find("name", "🌠┃powitalnia").send("(**SYSTEM**) Powitajmy użytkownika o nazwie @"  +  member.user.username )
});


try {
    let link = await client.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
    } catch(e) {
        console.log(e.stack);
        }
});

client.login(process.env.token);
