const express = require("express");
const { json } = require("express/lib/response");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {
    var CityQuery = req.body.NameOfCity;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + CityQuery + "&APPID=8e7a6514041c0b566c8a9ceb75102483";
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const disc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p> The weather is currently " + disc + "</p>");
            res.write("<h1>The temperature in " + CityQuery + " is " + temp + " Kelvin </h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send()

        });

    });

})

app.listen(3005, function () {
    console.log("server is running on port 3005");
})