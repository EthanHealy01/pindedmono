
const uPSchema = require('../user_profile/schema');
const { default: mongoose } = require('mongoose');
const authSchema= new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String, required:true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', unique: true},
});

authSchema.pre('save', function(next) {
    // pre-save hook
    next();
  });
  module.exports = mongoose.model('Auth',authSchema);