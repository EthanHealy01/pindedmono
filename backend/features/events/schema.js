const mongoose= require('mongoose');
const eventSchema = new mongoose.Schema({
    provider: {type: mongoose.Schema.Types.ObjectId, ref: 'Provider'},
    startDate: {type: Date, require: true},
    endDate: Date,
    title: String,
    description: String,
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'EventTags'}], 
    eventType: {type: mongoose.Schema.Types.ObjectId, ref: 'EventType'},
    maxCapacity: Number,
    costPerPerson: Number,
    minPerBooking: Number,
    maxPerBooking: Number,

})
eventSchema.pre('save', function(next) {
    // pre-save hook
    next();
  });
  module.exports = mongoose.model('Event', eventSchema);