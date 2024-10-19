const servicesSchema = require('../services/schema');
const mongoose = require('mongoose');
const GeoSchema = require('./geo_schema');
const providerSchema = new mongoose.Schema({

    name: String,
    description: String,
    email: String,
    providerType: {type: mongoose.Schema.Types.ObjectId, ref: 'ProviderType'},
    joinDate: Date,
    locationLat: String,
    locationLong: String,
    addressLine1: String,
    addressLine2: String,
    addressLine3: String,
    addressLine4: String,
    addressLine5: String,
    openingHours: String,
    phoneNumber: String,
    location:  {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number], index:"2dsphere" }
      },
    logoUrl: String,
    website: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }],
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }],
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    
});
providerSchema.index({ location: "2dsphere" })
providerSchema.pre('save', function (next) {
    // pre-save hook
    next();
});
module.exports = mongoose.model('Provider', providerSchema);
