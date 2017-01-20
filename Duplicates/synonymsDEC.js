//DUPLICATE

var prompt = require('prompt');
var request = require('request');


function SynonymAPI(apiKey){
    this.apiKey = apiKey;
}

SynonymAPI.prototype.getSynonyms = function(word, callback){
    
    var url = "http://words.bighugelabs.com/api/2/297c3daf8068381fabaddff1384d0867/" + word + "/json";
    
    request(url, function(err, result){
        if(err){
            callback(err)
        }
        else{
            try{
                var data = JSON.parse(result.body);
                callback(null, data);
            }
            catch(err){
                callback(err);
            }
        }
    });

}


//========EXPORTING================
module.exports = SynonymAPI;



// //====================testing===========================
// var s1 = new SynonymAPI()
// var word = "taco";
// var apiKey = "http://words.bighugelabs.com/api/2/297c3daf8068381fabaddff1384d0867/" + word + "/json";

// s1.getSynonyms(word, function(err, result){
//     if(err){
//         console.log("Error happened. Try again later.");
//     }
//     else{
//         console.log(result);
//     }
// })