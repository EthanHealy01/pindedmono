const mongoose= require('mongoose');
const servicesSchema= new mongoose.Schema({

    name: String,
    description: String

})

servicesSchema.pre('save', function(next) {
    // pre-save hook
    next();
  });
  module.exports = mongoose.model('Service',servicesSchema);