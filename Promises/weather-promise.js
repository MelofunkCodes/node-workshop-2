//DUPLICATE
//PROMISE VERSION
/*
LOGIC
1. Prompt user for their city
2. Request user lat and long from google geomap API
3. Request weather data from Dark Sky API
4. Display 1 day, 5 day results nicely (this will be the final promise)
*/

var requestPromise = require('request-promise');
var promptPromise = require('prompt-promise');
var colors = require('colors');
var Table = require('cli-table');

//=====re-usable functions=======
function toCelsius(tempinF) {
    return Math.floor((tempinF - 32) * 5 / 9);
}


//========WHAT'S THE SCENARIO?================
// function simplePrompt(question) {
//     console.log("question: ", question, " ", typeof question);
//     return promptPromise(question);
//         // .then(function(answers) {
//         //     console.log("answers: ", answers, " ", typeof answers);

//         //     return answers[question];
//         // });
//}

function getUserPromise(city) {
    var gmapsData = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city;

    return requestPromise(gmapsData)
        .then(function(result) {
            var userData = JSON.parse(result);

            var userLat = userData.results[0].geometry.location.lat;
            var userLon = userData.results[0].geometry.location.lng;

            return {
                lat: userLat,
                lon: userLon
            };
        });
}

function getWeatherPromise(coordinates) {
    var weather_url = "https://api.darksky.net/forecast/0cc176eabc4ede993d379115f3779cf8/" + coordinates.lat + "," + coordinates.lon;

    return requestPromise(weather_url).then(JSON.parse);

}

function displayWeatherData(weatherData) {
    //weatherData = JSON.parse(weatherData);

    return promptPromise("Enter [1] Current Weather or [2] 5 Day Weather: ")
        .then(function(answer) {

            //output CURRENT weather
            if (+answer === 1) {
                console.log("CURRENT WEATHER".bold.underline.blue);
                console.log(Date(+weatherData.currently.time));
                console.log(weatherData.currently.icon);
                console.log("Temp: ", toCelsius(+weatherData.currently.temperature), "\xB0C");
            }
            //output 5 DAY WEATHER
            else if (+answer === 2) {
                var table = new Table({
                    head: ['', 'Today'.bold, 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
                    colWidths: [20, 10, 10, 10, 10, 10]
                });

                var icon = ["Description: "];
                var minTemp = ["Min Temp (in \xB0C): "];
                var maxTemp = ["Max Temp (in \xB0C): "];

                for (var i = 0; i < 5; i++) {
                    icon.push(weatherData.daily.data[i].icon);
                    minTemp.push(toCelsius(+weatherData.daily.data[i].temperatureMin));
                    maxTemp.push(toCelsius(+weatherData.daily.data[i].temperatureMax));
                }

                table.push(icon, minTemp, maxTemp);

                console.log(table.toString());
            }
            else {
                console.log("Invalid choice. Please try again later.");
            }
            
            promptPromise.done();
        });

}

//==THE BIG FUNCTION=======
function getWeather() {
    return promptPromise("City: ")
        .then(function(answers) {
            return answers; //don't need to do answers[questions], the repsonse to promptPromise will be a string and you just convert it to what you want
        })
        .then(getUserPromise)
        .then(getWeatherPromise)
        .then(displayWeatherData)
        .catch(function(error) {
            console.log("Error happened somewhere.", error);
            
            promptPromise.finish();
        });
}



//=====call fxn==============

getWeather();
