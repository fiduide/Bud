function help(message){
    let help = message.content.split(" ");
    let search = help[1];

    message.channel.send("**La liste des commandes : **");
    let message_one = "```";
    if(search == null){
        message_two ='\n- !help [game] pour obtenir des informations sur les commandes du [game]\n- !blague pour que Bud vous lance une blague parfois pas très drôle ou incompréhensible...\n- en cours d\'écriture\n- !Bud (à découvrir)\n```';
    }else if(search != ""){
        if(search == "PingGame" || search == "pingGame"){
            message_two = '\n- !ping pour lancer la balle à Bud et tenter d\'augmenter votre score\n- !myScorePingGame pour obtenir votre score```';
        }else if(search == "Pendu" || search == "pendu"){
            message_two = '\n- !pendu [lettre/mot] pour tenter de trouver le mot du pendu\n- !startpendu pour initialiser une partie de pendu avec Bud ```';
        }else if(search =="Rand" || search == "rand"){
            message_two = '\n- !rand pour lancer le jeu RandGame face à Bud ```';
        }else {
            message_two = "\nCommande indisponnible pour l'instant ! ```";
        }
    }
    let sendmessage = message_one + message_two;
    message.reply(sendmessage);
}

exports.help = help;