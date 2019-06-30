var express = require("express");
var mongoose = require("mongoose")
var request = require("request")
var bodyParser = require("body-parser");
var app = express();

mongoose.connect("mongodb://localhost:27017/cricket" , { useNewUrlParser: true })

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
   res.render("home.ejs")
})

app.get("/matchList",function(req,res){
    var url ="http://cricapi.com/api/matches?apikey=fMpeEbvpR1S0u1hdUgaMsbGBsEs1"; 
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200)
        {
            var parsedMatches = JSON.parse(body);
            res.render("matches.ejs",{matches : parsedMatches})
        }
    })
})

app.post("/squads",function(req,res){
    url = "http://cricapi.com/api/fantasySquad?apikey=fMpeEbvpR1S0u1hdUgaMsbGBsEs1&unique_id=";
    id = req.body.unique_id ;
    url += id; 
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            parsedSquad = JSON.parse(body);
            res.render("squads.ejs",{Squads : parsedSquad})
        }
    })
})

app.post("/scores",function(req,res){
    url = "http://cricapi.com/api/cricketScore?apikey=fMpeEbvpR1S0u1hdUgaMsbGBsEs1&unique_id=";
    id = req.body.unique_id ;
    url += id;
    request(url,function(error,response,body)
    {
        var parsedData = JSON.parse(body)
        console.log(parsedData["score"])
        res.send("  Score: " + parsedData["score"])
    })
})

app.post("/player",function(req,res){
    id = req.body.pid
    url = "http://cricapi.com/api/playerStats?apikey=fMpeEbvpR1S0u1hdUgaMsbGBsEs1&pid="
    url += id
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200)
        {
            var parsedPlayer = JSON.parse(body)
            console.log(parsedPlayer["imageURL"])
            res.render("player.ejs",{Player : parsedPlayer})
        }
    })
})
app.listen(2000,function(){
    console.log("server started")
})