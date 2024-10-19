const mongoose= require('mongoose');
const userProfileSchema = new mongoose.Schema({
    firstName: {type: String, reqiured:true},
    lastName: {type: String, reqiured:true},
    email: {type: String, reqiured:true},
    dateOfBirth: Date,
    addLine1: String,
    addLine2: String, 
    addLine3: String,
    townCity: String,
    postZip: String,
    county: String,
    country: String,
    joinDate: Date,
    lastLogIn: Date,
    emailVerified: Boolean,
    password: {type: String, required:true}
})

userProfileSchema.pre('save', function(next) {
    // pre-save hook
    next();
  });
  module.exports = mongoose.model('UserProfile',userProfileSchema);