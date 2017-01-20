//DUPLICATE

/*
LOGIC
1. Prompt user for word
2. Request with [obj].getSynonyms for synonyms/antonyms etc
*/

//========IMPORTS============================================
var SynonymAPI = require('./synonymsDEC');
var prompt = require('prompt');
var colors = require('colors');
var Table = require('cli-table');

//========MAIN FUNCTION======================================
function thesaurus(){
    
    prompt.get(['word'], function(err, result){
        if(err){
            console.log("Error. Invalid word input. Try again later.");
        }
        else{
            var url = "http://words.bighugelabs.com/api/2/297c3daf8068381fabaddff1384d0867/" + result.word + "/json";
            
            var s1 = new SynonymAPI(url);
            
            s1.getSynonyms(result.word, function(err, response){
                if(err){
                    console.log("Error. Invalid thesaurus API. Try again later.");
                }
                else{
                    console.log(("SYNONYMS FOR " + result.word.toUpperCase() + ":").bold.underline.blue);
                    
                    var table = new Table({
                        colWidths: [20, 50]
                    });
                    
                    var adjectives = "";
                    var nouns = "";
                    var adverbs = "";
                    var verbs = "";
                    
                    if(response.adjective){
                        if(response.adjective.syn){
                            adjectives = response.adjective.syn.toString();
                        }
                    }
                    if(response.noun){
                        if(response.noun.syn){
                            nouns = response.noun.syn.toString();
                        }
                    }
                    if(response.adverb){
                        if(response.adverb.syn){
                            adverbs = response.adverb.syn.toString();
                        }
                    }
                     if(response.verb){
                        if(response.verb.syn){
                            verbs = response.verb.syn.toString();
                        }
                    }
                    
                    table.push(
                        {"Adjectives": adjectives},
                        {"Nouns": nouns},
                        {"Adverbs": adverbs},
                        {"Verbs": verbs}
                        );
                        
                        console.log(table.toString());
                    
                }
            });
        }
    });
    
}

//========TESTING FUNCTION======================================
thesaurus();

