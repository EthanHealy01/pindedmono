const config = require('config');
const plog = require('../logger');
const jwt = require('jsonwebtoken');
const path = config.get('pathRoot') + "/auth";
const noauthPath = config.get('noauthPath') + "/auth";
const userProfile = require('../user_profile/schema');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const authenticate = require('./authenticate');
const create_profile = require('./create_profile');


module.exports = function (app) {


    let tokenHeaderKey = config.get('tokenHeaderKey');
    let jwtSecretKey = config.get('jwtSecretKey');

    app.post(noauthPath, bodyParser.json(), (req, res) => {
        authenticate(req,res);

    });
    app.post(`${noauthPath}/create`, bodyParser.json(), (req, res) => {
        create_profile(req,res);
    });
    app.use('/v1', function(req,res,next){
        //make sure user is authenticated and authorized to access the path
        const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
        if(!token || !validateToken(token)){
            res.status(401).send("You need to log in to access this page")
        }else{
            next();
        }
      })
    // Verification of JWT
    function validateToken(token){
        return jwt.verify(token, jwtSecretKey);
    }
    app.get(`${path}/validateToken`, (req, res) => {

        try {
            const token = req.header(tokenHeaderKey);

            const verified = validateToken(token,jwtSecretKey);
            if (verified) {
                //TODO AuthZ stuff
                return res.status(200).send("Successfully Verified");
            } else {
                // Access Denied
                return res.status(401).send(error);
            }
        } catch (error) {
            // Access Denied
            return res.status(401).send(error);
        }
    });

}