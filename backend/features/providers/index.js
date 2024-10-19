const config = require('config');
const bodyParser = require('body-parser');
const path = config.get('pathRoot') + "/providers";
const provider = require('./schema');
const parseToken = require('../../auth/parse_token');
const { default: mongoose, now } = require('mongoose');
module.exports = function (app) {
    app.get(`${path}`, (req, res) => {
        res.send("Invalid request, need lat/long/km")
    });
    app.get(`${path}/mine`, (req, res) => {
        //TODO get user id from token
        getProvidersForUser(parseToken(req).userId, res)
    });
    app.get(`${path}/user/:userId`, (req, res) => {
        getProvidersForUser(req.params.userId, res);
    })
    app.get(`${path}/:lat/:long/:km`, (req, res) => {
        if (req.params.km > 20) {
            res.send("Max distance is 20km")
        } else {
            provider.find({
                location: {
                    $geoWithin: {
                        $centerSphere: [[req.params.long, req.params.lat], req.params.km / 6378.1] //6378.1 to convert km to radians - https://www.mongodb.com/docs/manual/core/indexes/index-types/geospatial/2d/calculate-distances/#std-label-calculate-distance-spherical-geometry

                    }
                }
            }).populate("location").then(providers => {
                res.send(providers)
            })

        }
    });
    app.get(`${path}/:providerId`, (req, res) => {
        console.log(req.params.providerId)
        try {
            provider.findById(req.params.providerId).populate('services').populate("providerType").then((prov) => {
                res.send(prov);
            });
        } catch (error) {
            res.send(error);
        }
    });
    app.post(`${path}/`, bodyParser.json(), (req, res) => {

        //TODO validate contents
        // TODO: check that referenced objects exist
        const newProvider = req.body;
        pro = new provider(newProvider);
        if (newProvider._id) {
            provider.findOneAndUpdate({ _id: newProvider._id }, newProvider, { new: true, upsert: true }).then(result => {


                res.send(result);
            });
        } else {

            newProvider.joinDate = now().toISOString();
            provider.insertMany(newProvider).then(result => {
                res.send(result)
            })
        }
    });
    getProvidersForUser = (userId, res) => {
        let memberships = { admin: [], user: [] };
        provider.find({ $or: [{ users: userId }] }).then(user => {
            memberships.user = user;
            provider.find({ $or: [{ admins: userId },] }).then(admin => {
                memberships.admin = admin;
                res.send(memberships)
            });
        })
    }
}

