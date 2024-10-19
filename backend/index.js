const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const app = express();
const host = config.get('server.host');

const port = config.get('server.port');
app.use(express.json());
app.all('*', function(req, res, next) {
    const origin = config.get('corsOptions.origins').includes(req.header('host').toLowerCase()) ? req.headers.origin : config.corsOptions.default;
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  // load models
  require('./auth/schema');
  require('./user_profile/schema');
  require('./features/events/schema');
  require('./features/services/schema');
  require('./features/providers/schema');
  require('./features/events/Tags/schema');
  require('./features/providers/provider_types/schema');
  // load routes
  require('./auth')(app);
  require('./user_profile')(app);
  require('./features/events/Tags')(app);
  require('./features/events')(app);
  require('./features/services')(app);
  require('./features/providers')(app);
  require('./features/providers/provider_types')(app);
mongoose.connect(config.get('connectionString'));


const server = app.listen (port, host, (err)=>{
    if(err){
        console.log(err);
    }
    console.log(`Server running on ${host}:${port}`);

});

module.exports=app;



  //to run nodemon on PS
//  powershell -ExecutionPolicy Bypass -File "C:\Program Files\nodejs\nodemon.ps1"