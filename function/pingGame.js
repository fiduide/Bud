const random = require('random');

function launchPingGame(message, connection){
    var pingpong = random.int(0, 1);
    if (pingpong == 0) {
        message.channel.send("***tente de vous renvoyez la balle***");
        message.channel.send("*échec de la procédure... renvoi impossible...*");
        message.reply("Vous gagnez le match !");

        let sql = 'SELECT * FROM score_ping WHERE idPlayer = '+message.member.id;
        connection.query(sql, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            if (results[0] == null) {
                console.log("je passe dans l'insert");
                let sql2 = 'INSERT INTO score_ping(idPlayer,scorePlayer,scoreRobot) VALUES("' + message.member.id + '", 1, 0)';
                connection.query(sql2);
                message.reply("Le score est de 1 | 0 pour vous");
            } else {
                let sqlInsert = 'UPDATE score_ping SET scorePlayer = scorePlayer + 1 WHERE idPlayer = "'+message.member.id+'"';
                console.log("je passe dans l'update");
                // execute the UPDATE statement
                connection.query(sqlInsert, (error, results, fields) => {
                    if (error) {
                        return console.error(error.message);
                    }
                });
                let scorePlayer = results[0].scorePlayer;
                let realScore = scorePlayer + 1;
                let winner = "pour vous";
                if(realScore > results[0].scoreRobot){
                    winner = "pour vous";
                }else if(realScore == results[0].scoreRobot){
                    winner = "égalité !";
                }else{
                    winner = "pour moi";
                }
                message.reply("Le score est de "+realScore+" || "+results[0].scoreRobot+" " +winner);
            }
        });
        //connection.query(sql);
        //TODO RAJOUTER UNE BDD AVEC COLUMN JOUEUR | WIN | PERDU ET AFFICHER LE SCORE
    } else {
        message.channel.send(" ***tente de vous renvoyez la balle et PONG, il fait un smash***");
        message.reply("malheureusement, vous avez perdu le match...");

        
        let sql = 'SELECT * FROM score_ping WHERE idPlayer = '+message.member.id;
        connection.query(sql, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            if (results[0] == null) {
                console.log("je passe dans l'insert");
                let sql2 = 'INSERT INTO score_ping(idPlayer,scorePlayer,scoreRobot) VALUES("' + message.member.id + '", 0, 1)';
                connection.query(sql2);
                message.reply("Le score est de 0 | 1 pour moi");
            } else {
                let sqlInsert = 'UPDATE score_ping SET scoreRobot = scoreRobot + 1 WHERE idPlayer = "'+message.member.id+'"';
                // execute the UPDATE statement
                connection.query(sqlInsert, (error, results, fields) => {
                    if (error) {
                        return console.error(error.message);
                    }
                });
                let scoreRobot = results[0].scoreRobot;
                let realScore = scoreRobot + 1;
                let winner = "pour vous";
                if(realScore > results[0].scorePlayer){
                    winner = "pour moi";
                }else if(realScore == results[0].scorePlayer){
                    winner = "égalité !";
                }
                else{
                    winner = "pour vous";
                }
                message.reply("Le score est de "+results[0].scorePlayer+" || "+realScore+" " +winner);
            }
        });
    }
}

function myScorePingGame(message, connection){
    if(message.content == "!myScorePingGame"){
        let myScore = "SELECT scorePlayer FROM score_ping WHERE idPlayer = '"+message.member.id+"'";
        connection.query(myScore, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }else if(results[0] == null){
                message.reply("Vous n'avez pas encore de score enregistré");
            }else {
                message.reply("Votre score est de : " +results[0].scorePlayer);
            }
        });
    }
}

exports.launchPingGame = launchPingGame;
exports.myScorePingGame = myScorePingGame;