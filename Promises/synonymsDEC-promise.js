//DUPLICATE
//PROMISE VERSION

var requestPromise = require('request-promise');


function SynonymAPI(apiKey){
    this.apiKey = apiKey;
}

SynonymAPI.prototype.getSynonymsPromise = function(word){
    
    var url = "http://words.bighugelabs.com/api/2/" + this.apiKey + "/" + word + "/json";
    
    return requestPromise(url);
    //.then(JSON.parse);

}


//========EXPORTING================
module.exports = SynonymAPI;



// //====================testing===========================
// var s1 = new SynonymAPI()
// var word = "taco";
// var apiKey = "297c3daf8068381fabaddff1384d0867";

// s1.getSynonymsPromise(word)
// .then(function(result){
//     console.log(result);
// })
// .catch(function(error){
//     console.log("Error. Try again later.");
// });