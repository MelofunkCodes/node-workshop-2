//DUPLICATE
/*
LOGIC
1. Prompt user for their city
2. Request user lat and long from google geomap API
3. Request weather data from Dark Sky API
4. Display 1 day, 5 day results nicely
*/

var requestJson = require('./requestJson');
var prompt = require('prompt');
var colors = require('colors');
var Table = require('cli-table');

//=====re-usable functions=======
function toCelsius(tempinF){
    return Math.floor( (tempinF - 32)*5/9 );
}


//========DEFINING MAIN FUNCTION================
function getWeather(){
    
    prompt.get(['city'], function(error, result){
        if(error){
            console.log("Error. Invalid city input. Try again later.");
        }
        else{
            var userURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + result.city;
            
            requestJson(userURL, function(error, response){
                if(error){
                    console.log("Error. Google Geomaps API invalid. Try again.");
                }
                else{
                    var userLat = response.results[0].geometry.location.lat;
                    var userLon = response.results[0].geometry.location.lng;
                    
                    var weather_url = "https://api.darksky.net/forecast/0cc176eabc4ede993d379115f3779cf8/" + userLat + "," + userLon;
                    
                    requestJson(weather_url, function(error, result){
                        if(error){
                            console.log("Error. Invalid Dark Sky weather API. Try again.");
                        }
                        else{
                            var weatherData = result;
                            
                            //ask USER if they want [1] Current Weather or [2] 5 Day Weather
                            console.log("Enter [1] Current Weather or [2] 5 Day Weather: ");
                            prompt.get(['number'], function(error, answer){
                                if(error){
                                    console.log("Error. Invalid choice. Enter 1 or 2 only. Try again");
                                }
                                else{
                                    //output CURRENT weather
                                    if (+answer.number === 1){
                                        console.log("CURRENT WEATHER".bold.underline.blue);
                                        console.log(Date(+weatherData.currently.time));
                                        console.log(weatherData.currently.icon);
                                        console.log("Temp: ", toCelsius( +weatherData.currently.temperature), "\xB0C");
                                    }
                                    //output 5 DAY WEATHER
                                    else if (+answer.number === 2) {
                                        var table = new Table({
                                            head: ['', 'Today'.bold, 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
                                            colWidths: [20, 10, 10, 10, 10, 10]
                                        });
                                        
                                        var icon = ["Description: "];
                                        var minTemp = ["Min Temp (in \xB0C): "];
                                        var maxTemp = ["Max Temp (in \xB0C): "];
                                        
                                        for (var i = 0; i < 5; i++){
                                            icon.push(weatherData.daily.data[i].icon);
                                            minTemp.push( toCelsius(+weatherData.daily.data[i].temperatureMin) );
                                            maxTemp.push( toCelsius(+weatherData.daily.data[i].temperatureMax) ); 
                                        }
                                        
                                        table.push(icon, minTemp, maxTemp);
                                        
                                        console.log(table.toString());
                                    }
                                    else{
                                        console.log("Invalid choice. Please try again later.");
                                    }
                                }
                            }); //end prompt for current or 5 day weather
                            
                        }
                    }); //requesting weather data
                    
                }
            }); //requesting user lat and lon
        }
    }); //end first prompt
    
    
}

//=====call fxn==============

getWeather();