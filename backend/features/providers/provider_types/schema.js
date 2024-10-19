
const mongoose = require('mongoose');
const providerTypeSchema = new mongoose.Schema({
    name: String,
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'ProviderType' },
    description: String,
   
});
providerTypeSchema.pre('save', function (next) {
    // pre-save hook
    next();
});
module.exports = mongoose.model('ProviderType', providerTypeSchema);
