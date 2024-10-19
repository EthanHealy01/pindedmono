const config = require('config');
const plog = require('../logger');
const jwt = require('jsonwebtoken');
const path = config.get('pathRoot') + "/auth";
const noauthPath = config.get('noauthPath');
const userProfile = require('../user_profile/schema');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const authenticate = require('./authenticate');
const create_profile = require('./create_profile');


module.exports = function (req) {


    let tokenHeaderKey = config.get('tokenHeaderKey');
    let jwtSecretKey = config.get('jwtSecretKey');
    const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  return jwt.verify(token, jwtSecretKey);
}