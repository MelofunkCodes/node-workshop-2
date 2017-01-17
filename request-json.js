//importing request Json function from request-as-json.js file
var requestJson = require('./library/request-as-json');


//======================TESTING================================
var url1 = "http://api.open-notify.org/iss-now.json";


//calling the function
//success case
requestJson(url1, function(error, response) {
            if (error) {
                console.log("something happened in request function call. try again later");
            }
            else {
                console.log(response);
            }
});