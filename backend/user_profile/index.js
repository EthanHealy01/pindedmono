const config = require('config');
const bodyParser = require('body-parser');
const path = config.get('pathRoot') + "/user_profile";
const userProfile = require('./schema');
const { default: mongoose } = require('mongoose');
module.exports = function (app) {
    app.get(`${path}`, (req, res) => {
        //TODO get user id from token
        res.send("not implemented, yet")
    });
    app.get(`${path}/:userId`, (req, res) => {
        try {
            userProfile.findById(req.params.userId, {password:0}).then((profile) => {
                res.send( profile);
            });
        } catch (error) {
            res.send(error);
        }
    });


    // app.post(`${path}/`, bodyParser.json(), (req, res) => {

    //     //TODO validate contents
    //     const profile = req.body;
    //     pro = new userProfile(profile);
    // pro.save(profile).then(() => {
    //     res.send( profile);
    // })

    // });
}
