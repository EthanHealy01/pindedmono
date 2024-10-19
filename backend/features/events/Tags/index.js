const config = require('config');
const bodyParser = require('body-parser');

const { default: mongoose } = require('mongoose');
const path = config.get('pathRoot') + "/event_tags";
const eventTag = require('./schema');
module.exports=function(app){
    app.post(path,bodyParser.json(),(req,res)=>{
        const newEventTag = req.body;
        const tag = new eventTag(newEventTag);
        tag.save(newEventTag).then(()=>{
            res.send("OK");
        })
    })
    app.get(path,(req,res)=>{
        eventTag.find().then(event_tags=>{
            res.send(event_tags)
        })
    })
}