
const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/cast.html");

});

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const apikey = "b58db9ea8da1c53c78f58bff4f492789";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey+ "&units" + unit;
    
    https.get(url, function(response){

        console.log(response.statusCode) ;

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        
            res.write("<p> The weather is currently" + weatherDescription + "<p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees fahrenheit</h1> ");
            res.write("<img src=" + imageurl +">");
            res.send();
        });
    })

});


app.listen(8000,()=>{
    console.log("Welcome to port 8000")
})

