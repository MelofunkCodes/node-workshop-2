var request = require('request');

function SynonymAPI(apiKey) {
    this.apiKey = apiKey;
}

SynonymAPI.prototype.getSynonyms = function(word, callback) {
    var wordURL = "http://words.bighugelabs.com/api/2/297c3daf8068381fabaddff1384d0867/" + word + "/json";
    
    request(wordURL, function(error, result) {
        if (error) {
            callback(error);
        }
        else {
            try {
                var synonyms = JSON.parse(result.body);
                callback(null, synonyms);
            }
            catch (error) {
                callback(error);
            }
        }
    });
};

//==========EXPORTING==============================
module.exports = SynonymAPI;

// //=========================TESTING==============
// var word ="taco";
// var url = "http://words.bighugelabs.com/api/2/297c3daf8068381fabaddff1384d0867/" + word + "/json";
// var s1 = new SynonymAPI(url);


// s1.getSynonyms(word, function(error, response){
//     if (error){
//         console.log("Error. Try again later.");
//     }
//     else{
//         console.log(response);
//     }
// })

