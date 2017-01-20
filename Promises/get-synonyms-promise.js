//DUPLICATE

/*
LOGIC
1. Prompt user for word
2. Request with [obj].getSynonyms for synonyms/antonyms etc
*/

//========IMPORTS============================================
var SynonymAPI = require('./synonymsDEC-promise');
var promptPromise = require('prompt-promise');
var colors = require('colors');
var Table = require('cli-table');

//========FUNCTION DECLARATIONS======================================

function formSynTable(response) {
    var table = new Table({
        colWidths: [20, 50]
    });

    var adjectives = "";
    var nouns = "";
    var adverbs = "";
    var verbs = "";

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
    if (response.adverb) {
        if (response.adverb.syn) {
            adverbs = response.adverb.syn.toString();
        }
    }
    if (response.verb) {
        if (response.verb.syn) {
            verbs = response.verb.syn.toString();
        }
    }

    table.push(
        {"Adjectives": adjectives}, 
        {"Nouns": nouns}, 
        {"Adverbs": adverbs}, 
        {"Verbs": verbs}
    );

    return table.toString();
} //this isn't a promise though, just a normal function


//==MAIN FUNCTION==
function thesaurus() {

    var gword = "";

    return promptPromise("What word do you want synonyms for? ")
        .then(function(word) {
            gword = word; //assigns the word to the global variable word
            console.log("word: ", word, " ", typeof word);

            var s1 = new SynonymAPI("297c3daf8068381fabaddff1384d0867");


            return s1.getSynonymsPromise(word)

        })
        .then(function(synonyms) {
            synonyms = JSON.parse(synonyms);
            console.log(("SYNONYMS FOR " + gword.toUpperCase() + ":").bold.underline.blue);
            console.log(formSynTable(synonyms));

            promptPromise.done(); //this terminates the program!! yay!!

        })
        .catch(function(error) {
            console.log("Error. Try again later", error);
            promptPromise.finish();
        });
}

//========TESTING FUNCTION======================================
thesaurus();
