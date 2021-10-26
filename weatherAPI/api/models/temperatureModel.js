'use strict';

var sourceFile = require("../../sourceFile");
var unirest = require('unirest');

exports.currentTemperature = function (request, response) {
    currentWeather(currentWeather, function (result) {
        console.log(result);
        response.json({ currentTemp : result.main.temp })//return the result

    });
};

function currentWeather(request, response) {
    //setting up the request with unirest
    unirest.get(sourceFile.weatherSource)
        .header("x-rapidapi-key", "c76717a343msh70a95aefd6328e5p170defjsn99fc504ed222")
        .header("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com")
        .query({
            "q": "Covilha",
            "lang": "fi, Dutch ",
            "units": "metric"
        })
        //actions at the end of the request
        .end(function (result) {
            if (result.error) throw new Error(result.error);//when there is an error, return this
            response(result.body);//return the result

        });

}