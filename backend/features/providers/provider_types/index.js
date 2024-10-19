const config = require('config');
const bodyParser = require('body-parser');
const path = config.get('pathRoot') + "/provider_types";
const providerType = require('./schema');
module.exports = function(app){
    app.get(path,(req,res)=>{
        providerType.find().then(result=>{
            res.send(result);
        })
    })
    app.post(path,bodyParser.json(),(req,res)=>{
        const pt= new providerType(req.body);
        pt.save().then(()=>{
            res.send(pt);
        });
    })
}
