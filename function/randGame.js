function randGame(message) {
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

exports.randGame = randGame;