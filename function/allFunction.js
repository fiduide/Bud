const random = require('random');
function contains(tab, phrase) {
    for (var i = 0; i < tab.length; i++) {
        if (phrase.content.includes(tab[i]) && phrase.member.user.username !== "Dorian 2.0") {
            return true
        }
    }
    return false;
}

function connectSQL(connection){
connection.connect(function (err) {
    if (err) {
            return console.error('[CONNEXION BDD]: ' + err.code);
        }

        console.log('Connected to the MySQL server.');
    });
}

async function TFTinsulte(channelid, badGuy, client) {
    console.log(channelid);
    var rand = random.int(30000, 180000);
    var randBadGuy = random.int(0, 18);
    //client.channels.cache.get('717760126706253827').send(rand);
    client.setTimeout(() => {
        client.channels.cache.get(channelid).send(badGuy[randBadGuy] + " !");
        client.channels.cache.get(channelid).send("Oups c'est sorti tout seul dsl !");
    }, rand);
}


async function robotDead(channelid, client) {
    var rand = random.int(300000, 900000);
    client.setTimeout(() => {
        client.channels.cache.get(channelid).send("**Dysfonctionnement interne !**");
        client.channels.cache.get(channelid).send("**Dysfonctionnement interne !**");
        client.channels.cache.get(channelid).send("** ERREUR ERREUR **");
        client.channels.cache.get(channelid).send("** ETAT D'URGENCE ACTIVE **");
        client.channels.cache.get(channelid).send("** VEUILLEZ ME METTRE HORS SERVICE **");
    }, rand);
}

function sendBlague(connection, message){
    let sql = "SELECT * FROM blagues ORDER BY RAND() LIMIT 1";
    connection.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }else{
            var re = /- /gi;
            if( results[0].blagues2 != null){
                let stringFirst = results[0].blagues.replace(re, '\n- ');
                
                let stringFirst2 = results[0].blagues2.replace(re, '\n- ');
                
                return message.reply("***Voici une blague stockée dans mon répertoire :***\n"+stringFirst + stringFirst2);
            }else{
                let stringFirst = results[0].blagues.replace(re, '\n- ');
               
                return message.reply("***Voici une blague stockée dans mon répertoire :***\n"+stringFirst);
            }
        }
        
});
}

exports.sendBlague = sendBlague;
exports.contains = contains;
exports.connectSQL = connectSQL;
exports.robotDead = robotDead;
exports.TFTinsulte = TFTinsulte;