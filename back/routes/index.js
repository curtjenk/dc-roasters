var express = require('express');
var router = express.Router();
//mongo & mongoose setup
var mongoUrl = "mongodb://localhost:27017/coffee";
var mongoose = require('mongoose');
mongoose.connect(mongoUrl);
//----- end of db setup

//Include models
var Account = require('../models/account');
//------ end of models

var bcrypt = require('bcrypt-nodejs');
// Create a token generator with the default settings:
var randtoken = require('rand-token');
var ApiResponse = function(func, success, message, token, doc) {
  this.func = func || undefined;
  this.success = success || false;
  this.message = message || undefined;
  this.token = token || undefined;
  this.doc = doc || undefined;
};

router.get('/getUserData', function(req, res, next){
  var apiResp =  new ApiResponse();
  apiResp.func = "getUserData";
  console.log("********* getUserData *************");
	console.log(req.query.token);
	if(req.query.token == undefined){
    apiResp.success = false;
    apiResp.message = "noToken";
		res.json(apiResp);
	}else{
		Account.findOne(
			{token: req.query.token}, //this is the droid we're looking for
			function (err, doc){

				if(doc !== null){
          apiResp.success = true;
          apiResp.doc = doc;

				}else{
          apiResp.success = false;
          apiResp.message = "badToken";
				}
        console.log(apiResp);
        res.json(apiResp);
			}
		);
	}
})


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/registerApi', function(req, res, next) {
    console.log(req.body);
    var apiResponse = new ApiResponse();
    var token = randtoken.generate(32);
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var email = req.body.email;
    var createDate = new Date();
    var modifiedDate = new Date();

    if (password == password2) {
        var hashedPassword = bcrypt.hashSync(password);
        var newAccount = new Account({
            token: token,
            username: username,
            password: hashedPassword,
            email: email,
            createDate: createDate,
            modifiedDate: modifiedDate
        });
        Account.findOne({
                username: username
            },
            function(err, docFound) {
                if (docFound === null) { //user doesn't exist
                    newAccount.save(); //insert to db.  Need error handling
                    apiResponse.success = true;
                    apiResponse.resp = {
                        username: username
                    };
                    req.session.username = username;
                } else {
                    apiResponse.success = false;
                    apiResponse.message = "user already exists";
                }
                console.log("*************  register response ********");
                console.log(apiResponse);
                res.json(apiResponse);
            });

    } else {
        //passwords don't match.  send error message and back to register page
        apiResponse.success = false;
        apiResponse.message = 'password mismatch';
        res.json(apiResponse);
    }
});

router.post('/loginApi', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
    var apiResponse = {
        success: false,
        message: undefined,
        resp: undefined
    };
    if (username === null || password === null || username.length === 0 || password.length === 0) {
        apiResponse.success = false;
        apiResponse.message = 'invalid request';
        res.json(apiResponse);
    }
    //query mongo
    Account.findOne({
            username: username
        },
        function(err, docFound) {
            console.log(err);
            console.log(docFound);

            if (docFound === null) {
                apiResponse.success = false;
                apiResponse.message = 'invalid user';
                res.json(apiResponse);
            }
            var passwordsMatch = bcrypt.compareSync(password, docFound.password); //returns boolean
            console.log("password match = " + passwordsMatch);
            if (passwordsMatch) {
                apiResponse.success = true;
                apiResponse.resp = docFound;
                req.session.username = username;
            } else {
                apiResponse.success = false;
                apiResponse.message = 'invalid password';
            }
            res.json(apiResponse);

        });
});

router.post('/options', function(req, res, next){
  console.log("******** update options ****** ")
  console.log(req.body);
  console.log(req.body.token);
  console.log(req.body.quantity);
  console.log(req.body.frequency);
  console.log(req.body.grind);
  var apiResp = new ApiResponse();
  apiResp.func = 'options';
	Account.update(
		{token: req.body.token}, //This is the droid I'm looking for
		{
			quantity: req.body.quantity,
			frequency: req.body.frequency,
			grind: req.body.grind
		},
		{multi:true}, //update multiple or not
		function(err, numberAffected){
			console.log(numberAffected);

			if(numberAffected.ok == 1){
				//we succeeded in updating.
        apiResp.success = true;
			}else {
          apiResp.success = false;
          apiResp.message = "Failed to update user account";
			}
      console.log(apiResp)
      res.json(apiResp);
		}
	);
});

router.post('/delivery', function(req, res, next){
	// console.log(req.body.fullname);
	Account.update(
		{token: req.body.token}, //which doc to update
		{
			fullname: req.body.fullname, // what to update
			address: req.body.addressOne,
			addres2: req.body.addressTwo,
			city: req.body.usrCity,
			state: req.body.usrState,
			zip: req.body.usrZip,
			deliveryDate: req.body.deliveryDate
		},
		{multi:true}, //update multiple or not
		function(err, numberAffected){
			console.log(numberAffected);
			if(numberAffected.ok == 1){
				//we succeeded in updating.
				res.json({success: "updated"});
			}else{
				res.json({failure: "failedUpdate"});
			}
		}
	);
});

module.exports = router;
