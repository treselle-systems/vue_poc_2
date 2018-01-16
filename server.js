
/**
 * Required modules
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var port = process.env.PORT || 3000;

/**
 * To allow cross origin browser requests
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// User credentials
var userObject = [{
	   firstName : "Kavi",
	   lastName : "Chithra",
	   email : "admin@gmail.com",
	   password : "admin123",
	   token : "fCzqZ7WhLk"
    }]

/**
 * To check the credentials and return the status
 */
app.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var response = {
    	status : false,
    }
    for(var i=0; i<userObject.length ; i++) {
        if(email == userObject[i].email){
        	if(password == userObject[i].password){
        		response.status = true;
        		response.userObject = userObject[i];
        	}
        	else{
        		response.status = false;
        		response.errMsg = 'Invalid Password';
        	}
        }
        else{
        	response.status = false;
        	response.errMsg = 'Invalid Email';
        }
    }
    res.send(response);
});


// start the server
app.listen(port);

console.log('Server started! At http://localhost:' + port);
