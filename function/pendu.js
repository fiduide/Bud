const random = require('random');

String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};

function pendu(message, connection, client) {
    let tabMots = ["panda", "amour", "seigneur"];
    let indexMotSearch = random.int(0, tabMots.length - 1);
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
                message.channel.send("***Les règles sont simple : \n- Au bout de 10 fautes, la partie s'arrête.\n- Vous pouvez essayer des mots directement.\n-!pendu (lettre/mot)***");
                realMot = tabMots[indexMotSearch];

                let buff = "";

                for (let j = 0; j < realMot.length - 1; j++) {
                    buff = buff + '-';
                }
                motATrouver = buff;

                let creaMot = "INSERT INTO pendu VALUES('" + realMot + "','" + motATrouver + "', 0, '" + message.channel.id + "')";
                connection.query(creaMot);
                message.channel.send("***Le mot à trouver est *** (" + motATrouver + ")");

            } else {
                message.reply("***Pendu déjà en cours le mot est => *** (" + results[0].motATrouver + ")");
            }
        });
    }

    if (message.content.includes("!pendu")) {

        let split = message.content.split(" ");
        
        let letter = split[1];
        console.log(split);
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
                if (results[0].realMot.indexOf(letter) != -1) {
                    console.log("Lettre trouvé dans le mot");
                    let fromIndex = results[0].realMot.indexOf(letter);
                    //dans le mot affiche "-----", on remplace le(s) tiret(s) par la lettre
                    //propos�e, � l'endroit ad�quat
                    while (fromIndex != -1) {
                        motTemp = motTemp.replaceAt(fromIndex, letter);
                        fromIndex++;
                        fromIndex = results[0].realMot.indexOf(letter, fromIndex);
                        console.log(motTemp);
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
                } else {
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
                }
            }
        });
    }
}


exports.pendu = pendu;