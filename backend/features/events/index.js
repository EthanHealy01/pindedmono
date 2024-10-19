const config = require('config');
const bodyParser = require('body-parser');
const path = config.get('pathRoot') + "/events";
const event = require('./schema');
const filterBuilder = require('../../utils/filter_builder')
const querystring = require('querystring');
const { default: mongoose } = require('mongoose');
module.exports = function (app) {
    app.get(`${path}/provider/:providerId`, (req, res) => {
        // let query = event.find({provider:req.params.providerId});
        req.query['eq_provider'] = req.params.providerId;
        let query = filterBuilder(event, req.query);

        query.then(data => {
            res.send(data)
        })
    });
    app.get(`${path}`, (req, res) => {
        //TODO get user id from token
        res.send("not implemented, yet")
    });
    app.get(`${path}/:eventId`, (req, res) => {
        try {
            event.findById(req.params.eventId).then((event) => {
                res.send(event);
            });
        } catch (error) {
            res.send(error);
        }
    });
    app.post(`${path}/filter`, bodyParser.json(), (req, res) => {
        let query = filterBuilder(event, req.body);
        query.then(data => res.send(data))
    })
    app.post(`${path}/`, bodyParser.json(), (req, res) => {

        //TODO validate contents
        const newEvent = req.body;
        evt = new event(newEvent);
        evt.save(newEvent).then(() => {
            res.send(evt);
        })
    });
}
