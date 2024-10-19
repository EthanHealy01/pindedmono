const bcrypt = require('bcrypt');

const config = require('config');

module.exports = function (password) {
    return bcrypt
        .genSalt(config.get("saltRounds"))
        .then(salt => {
            return bcrypt.hash(password, salt)
        })
        .then(hash => {
            return hash;
        })
        .catch(err => console.error(err.message))
}
