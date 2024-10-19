const config = require('config');
const bodyParser = require('body-parser');
const path = config.get('pathRoot') + "/provider_services";
const service = require('./schema');
const { default: mongoose, now } = require('mongoose');


module.exports = function(app){
    app.get(path,bodyParser.json(),(req,res)=>{
        service.find().then(services=>{
            res.send(services);
        })
    })
}