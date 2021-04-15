const random = require('random');

String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};

let lastIndex = 0;

function pendu(message, connection, client) {
    let tabMots = ["panda", "amour", "seigneur", "informatique", "programmation", "ordinateur", "constitution", "seigneur", 'anticonstitutionnellement', 'rapport', 'examen', 'support', 'dictionnaire', 'chat', 'chien', 'lapin',
    'message','index', 'pendu', 'initialisation', 'partie', 'variant', 'hiboux'];
    let indexMotSearch = random.int(0, tabMots.length - 1);
    if(indexMotSearch != lastIndex){
        indexMotSearch = random.int(0, tabMots.length - 1);
    }
    let rechercheDeJeu = "SELECT * FROM pendu WHERE channelId = " + message.channel.id;
    let realMot = "";
    let motATrouver = "";

    if (message.content == "!startpendu") {
        connection.query(rechercheDeJeu, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            if (results[0] == null) {
                message.channel.send("***Initialisation de la partie... Veuillez patienter.***");
                message.channel.send("***Les règles sont simple : \n- Tout le monde peut y participer.\n- Au bout de 10 fautes, la partie s'arrête.\n- Vous pouvez essayer des mots directement.\n- Pour jouer c'est simple, tapé !pendu (lettre/mot)***");
                realMot = tabMots[indexMotSearch];

                let buff = "";

                for (let j = 0; j < realMot.length; j++) {
                    buff = buff + '-';
                }
                motATrouver = buff;

                let creaMot = "INSERT INTO pendu VALUES('" + realMot + "','" + motATrouver + "', 0, '" + message.channel.id + "')";
                connection.query(creaMot);
                message.channel.send("***Le mot à trouver est *** (" + motATrouver + ")");

            } else {
                message.reply("***Pendu déjà en cours le mot est => *** (" + results[0].motATrouver + ")\n- Pour jouer c'est simple, tapé !pendu (lettre/mot)");
            }
        });
    }

    if (message.content.includes("!pendu") && message.member.user.username != "Dorian 2.0") {
        
        let split =  message.content.split(" ");
        let letter = split[1];
        connection.query(rechercheDeJeu, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            if (results[0] == null) {
                message.reply("***Aucun pendu n'est actuellement créé sur ce salon, pour en lancer un, faites !startpendu ***");

            } else {
                let nbFautes = results[0].nbFautes;
                motATrouver = results[0].motATrouver;
                let motTemp = motATrouver;
                let realMot = results[0].realMot;
                if (letter != ""  && results[0].realMot.indexOf(letter) != -1) {
                    let fromIndex = results[0].realMot.indexOf(letter);
                    //dans le mot affiche "-----", on remplace le(s) tiret(s) par la lettre
                    //propos�e, � l'endroit ad�quat
                    while (fromIndex != -1) {
                        motTemp = motTemp.replaceAt(fromIndex, letter);
                        fromIndex++;
                        fromIndex = results[0].realMot.indexOf(letter, fromIndex);

                    }
                    motATrouver = motTemp;
                    let sqlInsert = 'UPDATE pendu SET motATrouver = "' + motATrouver + '" WHERE channelId = "' + message.channel.id + '"';
                    connection.query(sqlInsert, (error, results, fields) => {
                        if (error) {
                            return console.error(error.message);
                        }else{
                            message.reply("Bonne réponse ! (" + motATrouver + ") vous avez actuellement " + nbFautes + " faute(s)");
                            if (motATrouver == realMot) {
                                let deleteROW = 'DELETE FROM pendu WHERE channelId = "' + message.channel.id + '"';
                                connection.query(deleteROW, (error, results, fields) => {
                                    if (error) {
                                        return console.error(error.message);
                                    } else {
                                        message.channel.send("**Félicitation, vous avez trouvé le mot " +realMot+ " ! " + nbFautes + " faute(s)**");
                                    }

                                });
                            }
                        }
                    });
                }else if(letter != ""){
                    let addFautes = 'UPDATE pendu SET nbFautes = nbFautes+1 WHERE channelId = "' + message.channel.id + '"';
                    nbFautes++;
                    connection.query(addFautes, (error, results, fields) => {
                        if (error) {
                            return console.error(error.message);
                        } else {
                            message.reply("Mauvaise réponse... vous avez actuellement " + nbFautes + " faute(s) ! (" + motATrouver + ")");
                            if (nbFautes == 10) {

                                let deleteROW = 'DELETE FROM pendu WHERE channelId = "' + message.channel.id + '"';
                                connection.query(deleteROW, (error, results, fields) => {
                                    if (error) {
                                        return console.error(error.message);
                                    } else {
                                        message.channel.send("**vous avez malheureusement échoué au pendu, relancer une partie pour continuer**");
                                    }

                                });
                            }
                        }
                    });
                }else{
                    message.reply("Attention, vous avez mis un ou plusieurs espace en trop, veuillez réessayer.");
                }
            }
        });
    }
}


exports.pendu = pendu;