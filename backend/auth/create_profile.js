const hasher = require('./hasher');
const userProfile = require('../user_profile/schema');
module.exports=function(req,res){
    const profile = req.body;
console.log(req.body)
    hasher(profile.password).then(hash => {
        try {
            profile.password = hash;
            userProfile.create(profile).then(() => {

                res.status(200).send("OK");
            }).catch(e => {
console.log(e)
                res.status(500).send(e);
            })
        } catch (e) {
            console.log(e)
            res.status(500).send(e);
        }
    })
}