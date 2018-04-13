var friends = require("../data/friends");

module.exports = function(app){

    app.get("api/friends", function(req, res){
        res.json(friends)
    });

    app.post("api/friends", function(req, res){
        var match = {
            name: "",
            photo: "",
            diffScore: 0
        };
        var userData = req.body;
        var userName = userData.name;
        var userPhoto = userData.photo;
        var userScores = userData.scores;
        var totalDifference = 0;
      
        for  (var i=0; i< friends.length; i++) {
            totalDifference = 0;
            for (var j=0; j< friends[i].scores.length; j++){
                totalDifference += Math.abs((userScores[j]) - (friends[i].scores[j]));
                if (totalDifference <= match.diffScore){
                    match.name = friends[i].name;
                    match.photo = friends[i].photo;
                    match.diffScore = totalDifference;
                }
            }
        }
        friends.push(userData);
        res.json(match);
    });
}