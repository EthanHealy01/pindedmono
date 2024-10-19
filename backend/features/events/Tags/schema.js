const mongoose= require('mongoose');
const tagSchema = new mongoose.Schema({
    tag: String

});

tagSchema.pre('save', function(next) {
    // pre-save hook
    next();
  });
  module.exports = mongoose.model('Tag', tagSchema);