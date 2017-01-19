var SynonymAPI = require('./library/synonyms');
var prompt = require('prompt');
var colors = require('colors');
var Table = require('cli-table');



function thesaurus() {
    prompt.get(['word'], function(error, result) {
        if (error) {
            console.log("Error. Invalid word input. Try again later.");
        }
        else {
            var apiKey = "http://words.bighugelabs.com/api/2/297c3daf8068381fabaddff1384d0867/" + result.word + "/json";

            var s1 = new SynonymAPI(apiKey);

            // console.log("command line received. You inputted " + result.word);
            // console.log("API Key: ", apiKey);
            // console.log("s1: ", s1);

            //request synonyms etc with getSynonyms method of SynonymAPI object
            s1.getSynonyms(result.word, function(error, response) {
                if (error) {
                    console.log("Error in requesting synonyms from API", error);
                }
                else {

                    //output out the properties in API key object
                    console.log(("SYNONYMS OF " + "\"" + result.word.toUpperCase() + "\"").bold.red.underline);


                    //outputs synonyms into TABLE FORMAT
                    var adjectives = "";
                    var nouns = "";
                    var verbs = "";
                    var adverbs = "";

                    /*
                    1. If adjective property exists, then STRINGIFY "adjective.syn" array, then assign it to adjectives variable
                    2. Same for noun, verb, and adverb properties
                    
                    */

                    //below checks if there are properties for adjective, noun, verb, adverb
                    //the inner if statements check if the synonym property itself exists inside that object (because in the case with "small", there was no synonym, but only antonym for adverb)
                    if (response.adjective) {
                        if (response.adjective.syn) {
                            adjectives = response.adjective.syn.toString();
                        }
                    }
                    if (response.noun) {
                        if (response.noun.syn) {
                            nouns = response.noun.syn.toString();
                        }
                    }
                    if (response.verb) {
                        if (response.verb.syn) {
                            verbs = response.verb.syn.toString();
                        }
                    }
                    if (response.adverb) {
                        if (response.adverb.syn) {
                            adverbs = response.adverb.syn.toString();
                        }
                    }

                    // //Vertical Table Format
                    // var table = new Table({
                    //                         head: ["Adjectives", "Nouns", "Verbs", "Adverbs"],
                    //                         colWidths: [10, 10, 10, 10]
                    //                     });
                    // table.push( [adjectives, nouns, verbs, adverbs] );

                    //Horizontal Table Format
                    var table = new Table({
                        colWidths: [15, 50]
                    });

                    table.push({
                        "Adjectives": adjectives
                    }, {
                        "Nouns": nouns
                    }, {
                        "Verbs": verbs
                    }, {
                        "Adverbs": adverbs
                    });

                    console.log(table.toString());
                }
            });
        }
    });

}

//================CALLING THE FUNCTION============================
thesaurus();
