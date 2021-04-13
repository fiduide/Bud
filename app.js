require('dotenv').config();
const random = require('random');
const Discord = require('discord.js');
const client = new Discord.Client();
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'cappedorian.fr',
    user: 'c1453962c_root',
    password: 'fiduide1611',
    database: 'c1453962c_discord_bud'
});


client.once('ready', () => {
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
        connectSQL();
        var pingpong = random.int(0, 1);
        if (pingpong == 0) {
            message.channel.send("***tente de vous renvoyez la balle***");
            message.channel.send("*échec de la procédure... renvoi impossible...*");
            message.reply("Vous gagnez le match !");

            let sql = 'SELECT * FROM score_ping WHERE idPlayer = ?';
            console.log(message.member.id);
            connection.query(sql, [message.member.id], (error, results, fields) => {
                if (error) {
                    return console.error(error.message);
                }
                if (results == nul) {
                    let sql2 = 'INSERT INTO score_ping(idPlayer,scorePlayer,scoreRobot) VALUES(' + message.member.id + ', 1, 0)';
                    connection.query(sql2);
                } else {
                    let sqlInsert = 'UPDATE todos SET scorePlayer = scorePlayer + 1 WHERE idPlayer = ?';

                    let data = [message.member.id];

                    // execute the UPDATE statement
                    connection.query(sqlInsert, data, (error, results, fields) => {
                        if (error) {
                            return console.error(error.message);
                        }
                        console.log('Rows affected:', results.affectedRows);
                    });
                }
                console.log(results);
                console.log(fields);
            });

            connection.query(sql);

            connection.end();
            //TODO RAJOUTER UNE BDD AVEC COLUMN JOUEUR | WIN | PERDU ET AFFICHER LE SCORE
        } else {
            message.channel.send(" ***tente de vous renvoyez la balle et fait un smash***");
            message.reply("malheureusement, vous avez perdu le match...");

            
            let sql = 'SELECT * FROM score_ping WHERE idPlayer = ?';
            connection.query(sql, [message.member.id], (error, results, fields) => {
                if (error) {
                    return console.error(error.message);
                }
                if (results == nul) {
                    let sql2 = 'INSERT INTO score_ping(idPlayer,scorePlayer, scoreRobot) VALUES(' + message.member.id + ', 0, 1)';
                    connection.query(sql2);
                } else {
                    let sqlInsert = 'UPDATE todos SET scorePlayer = scoreRobot + 1 WHERE idPlayer = ?';

                    let data = [message.member.id];

                    // execute the UPDATE statement
                    connection.query(sqlInsert, data, (error, results, fields) => {
                        if (error) {
                            return console.error(error.message);
                        }
                        console.log('Rows affected:', results.affectedRows);
                    });
                }
                console.log(results);
                console.log(fields);
            });

            connection.query(sql);

            connection.end();
        }
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

    if (contains(badGuy, message)) {
        message.channel.send(`Les gros mots c'est MAL !`);
    }

    if (message.content.includes('tft') || message.content.includes('TFT')) {
        TFTinsulte(message.channel.id);
    }

    if (contains(Games, message)) {
        message.channel.send('HOP HOP HOP On se reconcentre tout de suite là !')
    }

    if (contains(TabHello, message)) {
        message.channel.send('Salut :D')
    }

    if ((message.content.includes('robot') || message.content.includes('Robot')) && message.member.user.username !== "Dorian 2.0") {
        message.channel.send(`On parle de moi ? Sachez que j\'ai des oreilles partout \:robot:`);
        robotDead(message.channel.id);
    }
    if ((message.content.includes('pardon') || message.content.includes('Pardon') || message.content.includes('désolé') || message.content.includes('Désolé') || message.content.includes('Excuse moi') || message.content.includes('excuse moi')) && message.member.user.username !== "Dorian 2.0") {
        message.channel.send('pas de problème');
    }

    if (message.content == "!rand") {
        var robot = random.int(0, 100)
        var player = random.int(0, 100)
        var user = message.author.id;

        message.channel.send("Je tire les nombres veuillez patienter...");
        setTimeout(() => {
            message.channel.send("...   ...   ...   ...   ...");
            setTimeout(() => {
                message.channel.send(`<@${user}>` + ' ton nombre est : ' + player);
                setTimeout(() => {
                    message.channel.send('mon nombre est : ' + robot);
                }, 2000);
            }, 3000);
        }, 5000);
        if (player > robot) {
            setTimeout(() => {
                message.channel.send("Bravo **<@" + message.member.user.id + ">** tu as gagné !");
            }, 11000);
        } else {
            setTimeout(() => {
                message.channel.send("**MOUAHAHAHAH j'ai gagné, je vais pouvoir envahir le monde maintenant !**");
            }, 11000);
            client.user.setActivity("envahir le monde !");
            client.setTimeout(() => {
                client.user.setStatus('En développement !');
            }, 40000);
        }
    }
});


async function TFTinsulte(channelid) {
    console.log(channelid);
    var rand = random.int(30000, 180000);
    var randBadGuy = random.int(0, 18);
    //client.channels.cache.get('717760126706253827').send(rand);
    client.setTimeout(() => {
        client.channels.cache.get(channelid).send(badGuy[randBadGuy] + " !");
        client.channels.cache.get(channelid).send("Oups c'est sorti tout seul dsl !");
    }, rand);
}


async function robotDead(channelid) {
    var rand = random.int(300000, 900000);
    client.setTimeout(() => {
        client.channels.cache.get(channelid).send("**Dysfonctionnement interne !**");
        client.channels.cache.get(channelid).send("**Dysfonctionnement interne !**");
        client.channels.cache.get(channelid).send("** ERREUR ERREUR **");
        client.channels.cache.get(channelid).send("** ETAT D'URGENCE ACTIVE **");
        client.channels.cache.get(channelid).send("** VEUILLEZ ME METTRE HORS SERVICE **");
    }, rand);
}


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


function contains(tab, phrase) {
    for (var i = 0; i < tab.length; i++) {
        if (phrase.content.includes(tab[i]) && phrase.member.user.username !== "Dorian 2.0") {
            return true
        }
    }
    return false;
}

function connectSQL(){
connection.connect(function (err) {
    if (err) {
            return console.error('error sur => [CONNEXION BDD]: ' + err.message);
        }

        console.log('Connected to the MySQL server.');
    });
}

client.login(process.env.DISCORD_TOKEN);