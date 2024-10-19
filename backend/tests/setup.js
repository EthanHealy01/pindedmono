
const mongoose = require('mongoose');
const config = require('config')
const {expect } = require('chai')
let chai,chaiExpect;

before(async () => {
    chai = await import('chai').then(module => module.default);
  //  chai = chaiModule.default; // For ES Module version
  console.log(chai)
    chaiExpect = chai.expect
    
    await  mongoose.connect(config.get('connectionString'));
});

// Export chai and expect for global use
global.chai = chai;
global.expect = chaiExpect;