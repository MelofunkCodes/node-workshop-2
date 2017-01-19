//Creating our own callback-receiving function (higher-order function)

//=================FUNCTION DECLARATION=======================
var request = require('request');

function requestJson(url, callbackFunction) {
    request(url, function(error, response) {
        //this if-else is testing if there is an error in your request function call.
        //I.E. if you send an invalid URL to the request function
        if (error) {
            console.log("something happened. URL invalid. try again later"); //Ziad was saying in Jan 18 2017, do not need to console.log stuff in function declaration. Just callback to cb function and send the error.
            callbackFunction(error); //called "throwing the error"
            //do not need line 11. that is essentially line 10. But you can test if line 11 works and if it does, you will see a second print out line
        }
        else {
            
            //this try-catch is testing if the "response.body" that you are sending to JSON.parse is an object
            //if it is not, CATCH will catch the error and send it to the callback function in lines 25-28, which will THEN print out its error message
            try {
                //JSON.parse body of webpage and assign it to result
                var result = JSON.parse(response.body);
                callbackFunction(null, result);
                //line 22. Since we cannot RETURN values with callback function, we call the callback function so it can THEN execute the result
            }
            catch (error) {
                console.log("Error happened because thing sent to JSON.parse was NOT an object");
                callbackFunction(error);
            }
        }
    });
}

//=== choosing what I want to export==========
module.exports = requestJson;
//exporting the function as the default export (i.e. module.exports = one value --vs-- the object literal notation way to select multiple values)
//do not need to export line 4, request variable



// //======================EXECUTION============================
// var url1 = "http://api.open-notify.org/iss-now.json";
// var url2 = "http://api.opezzzzn-notify.org/iss-now.json";

// //calling the function
// //success case
// requestJson(url1, function(error, response) {
//             if (error) {
//                 console.log("POTATO something happened in request function call. try again later");
//             }
//             else {
//                 console.log(response);
//             }
// });

// //error case
// requestJson(url2, function(error, response) {
//             if (error) {
//                 console.log("HAM something happened in request function call. try again later");
//             }
//             else {
//                 console.log(response);
//             }
// });
// //Reason why you see error case first versus success case upon output, is the nature of async. code. It was faster to get to error message than it was to get ISS satellite info from API server


// //=====================LOGIC===============================
// //Mathieu's explanation of this exercise (i.e. CALLBACKS)
// /*
// He's the customer and he came to my store. He wants a pencil.

// I have no pencil in stock. So he gives me his kid so that when I GET a pencil, I can give that pencil to his kid who can then do something with the pencil (lines 44-46)

// The pencil in this case is the "url".
// His kid is the callback function("callbackFunction"), the second parameter sent to requestJson call (lines 39-46). 

// The request function (line 7) is me calling the warehouse to deliver the pencil to me. 
// The try happens when the warehouse delivers pencil to me. I then give pencil to the kid (callbackFunction) who then does something with it. -->Success! My task is done!
// The catch happens when the warehouse delivers a BLUE pencil to me. I wanted a BLACK pencil, but they gave me BLUE. I tell the kid (through "error"), that I don't have the pencil he wants.
// */


//module.exports = requestJson;