require('dotenv').config();
const random = require('random');
const Discord = require('discord.js');
const client = new Discord.Client();
let mysql = require('mysql');

let pingGame = require('./function/pingGame');
let randGame = require('./function/randGame');
let allFunction = require('./function/allFunction');

let connection = mysql.createConnection({
    host: 'mysql-cappe.alwaysdata.net',
    user: 'cappe',
    password: 'fiduide161100',
    database: 'cappe_discord_bud',
});


client.once('ready', () => {
    allFunction.connectSQL(connection);
    console.log('Ready !')
    client.user.setActivity("En cours de développement !");
    client.channels.cache.get('768366908105293828').send("Bot lancé ! ");
});

var TabHello = ['Salut', 'Hey', 'hey', "salut", "bonjour", "Bonjour"];
var TabHow = ['ça va ?', 'Ca va ?', 'Comment ça va', 'comment ça va', 'Vous allez bien ?', 'vous allez bien ?', 'tu vas bien ?', 'Tu vas bien ?', 'Ca a été votre week-end'
    , 'ça a été votre week-end', 'bien et toi', 'Ca a été votre weekend', 'ça a été votre weekend', 'Ca va et toi', 'ca va et toi', 'ça va et toi', ' ben écoutes ca va et toi', 'je vais bien et toi'];
var badGuy = ['fdp', 'ftg', 'pute', 'connasse', 'batard', ' merde ', 'stfu', 'connard', 'enculé', 'enfoiré', 'ntm', 'nique ta mère', ' nique', 'sale con', 'abruti', 'con', 'salope', 'salaud', 'salop', 'fuck', 'ta gueule', 'merde', 'putain'];
var Games = ['TFT', 'tft', 'HFF', 'hff'];

client.on('message', (message) => {
    if (message.content == "ping") {
        pingGame.launchPingGame(message, connection);
    }

    if ((message.content.includes('<:logoRed:718372078369243146>') || message.content.includes("<:logo:718366107647344670>")) && message.member.user.username != "Dorian 2.0") {
        message.channel.send("<:logoRed:718372078369243146> <:logo:718366107647344670>  <:logoRed:718372078369243146> <:logo:718366107647344670>");
    }

    if (message.content === 'rip' || message.content === 'RIP') {
        // Create the attachment using MessageAttachment
        const attachment = new Discord.MessageAttachment('https://i.imgur.com/w3duR07.png');
        // Send the attachment in the message channel
        message.channel.send(attachment);
    }

    if (message.content.includes('mauvaise nouvelle') || message.content.includes('Mauvaise nouvelle')) {
        message.channel.send(`j'espère que ce n'est pas trop grave \:worried:`);
    }

    if (allFunction.contains(badGuy, message)) {
        message.channel.send(`Les gros mots c'est MAL !`);
    }

    if (message.content.includes('tft') || message.content.includes('TFT')) {
        allFunction.TFTinsulte(message.channel.id, badGuy, client);
    }

    if (allFunction.contains(Games, message)) {
        message.channel.send('HOP HOP HOP On se reconcentre tout de suite là !')
    }

    if (allFunction.contains(TabHello, message)) {
        message.channel.send('Salut :D')
    }

    if ((message.content.includes('robot') || message.content.includes('Robot')) && message.member.user.username !== "Dorian 2.0") {
        message.channel.send(`On parle de moi ? Sachez que j\'ai des oreilles partout \:robot:`);
        allFunction.RobotDead(message.channel.id, client);
    }
    if ((message.content.includes('pardon') || message.content.includes('Pardon') || message.content.includes('désolé') || message.content.includes('Désolé') || message.content.includes('Excuse moi') || message.content.includes('excuse moi')) && message.member.user.username !== "Dorian 2.0") {
        message.channel.send('pas de problème');
    }

    if (message.content == "!rand") {
        randGame.randGame(message, client);
    }
});




let hours;
let min;

client.setInterval(() => {
    var now = new Date();
    hours = now.getHours();
    min = now.getMinutes();
}, 60000);

if (hours == 9 && min == 0) {
    client.channels.cache.get('717760126706253827').send("@here ça commence ! Passez une bonne journée !");
}
else if (hours == 10 && min == 30) {
    client.channels.cache.get('717760126706253827').send("Allez courage, tenez bon !");
}
else if (hours == 13 && min == 0) {
    client.channels.cache.get('717760126706253827').send("LA MATINEE EST TERMINE BON APPETIT A TOUS!");
}
else if (hours == 14 && min == 0) {
    client.channels.cache.get('717760126706253827').send("@here On reprend, courage, vous avez fait déjà la moitié !");
}
else if (hours == 15 && min == 0) {
    client.channels.cache.get('717760126706253827').send("MAINTENEZ LES POSITIONS !!");
    client.channels.cache.get('717760126706253827').send("PLUS QUE 3 HEURES COURAGE !");
}
else if (hours == 16 && min == 0) {
    client.channels.cache.get('717760126706253827').send("PLUS QUE 2 HEURES COURAGE !");
}
else if (hours == 17 && min == 0) {
    client.channels.cache.get('717760126706253827').send("PLUS QUE 1 HEURE... J'EN PEUX PLUS  \:worried: !");
}
else if (hours == 17 && min == 40) {
    client.channels.cache.get('717760126706253827').send("PLUS QUE 20 MIN COURAGE !");
}
else if (hours == 17 && min == 50) {
    client.channels.cache.get('717760126706253827').send("PLUS QUE 10 MIN COURAGE !");
}
else if (hours == 18 && min == 0) {
    client.channels.cache.get('717760126706253827').send("FINI !!!!");
}



client.login(process.env.DISCORD_TOKEN);