var request = require('request');

function requestJson(url, callback){
    request(url, function(err, result){
        if(err){
            console.log("Error. Invalid URL. Try again.");
            callback(err);
        }
        else{
            try{
                var data = JSON.parse(result.body);
                callback(null, data);
            }
            catch(err){
                console.log("Error. Error with parsing result.");
                callback(err);
            }
        }
    });
}

//====EXPORTING=============
module.exports = requestJson;


// //=========TESTING=======
// //ISS API
// var url = "http://api.open-notify.org/iss-now.json";
// var url2 = "http://www.okayplayer.com/news/busty-and-the-bass-up-top-premiere.html"; //here CATCH will catch the error.
// var url3 = "http://api.openzzz-notify.org/iss-now.json"; // here request's callback function first param will get error

// requestJson(url3, function(error, response){
//     if(error){
//         console.log("Error. Something happened. Try again later.");
//     }
//     else{
//         console.log(response);
//     }
// });