var request = require('request');
var prompt = require('prompt');

function requestPromise(url) {

    return new Promise(function(resolve, reject) {
        request(url, function(error, result) {
            if (error) {
                reject(error);
            }
            else {
                resolve(result.body);
            }

        });
    });

}

function promptPromise(question){
    return new Promise(function(resolve, reject){
        prompt.get(question, function(error, result){
            if (error){
                reject(error);
            }
            else{
                resolve(result[question]);
                //bracket notation is preferred because with dot notation it was doing result."question" vs result.question. Bracket notation saves it and gives it result["question"] because BRACKETS evaluates what's inside first.
            }
        });
    });
}



//=============TESTING=====================================
requestPromise("http://api.open-notify.org/iss-now.json")
.then(JSON.parse)
.then(function(result){
    console.log(result);
})
.catch(function(error){
    console.log("Error happened. Try again later.");
});

promptPromise("Enter a city: ")
.then(function(result){
    console.log("result: ", typeof result);
    console.log("You live in " + result + "? Nice!");
})
.catch( function(error){
    console.log("Error happened. Try again later.");
})