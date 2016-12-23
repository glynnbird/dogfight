"use strict"

/*****
    Express and environment
*****/
const express = require('express');
const app = express();
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

// static
app.use(express.static('public'))

/*****
    Listening
*****/
app.listen(appEnv.port, ( appEnv.bind == "localhost" ? null : appEnv.bind ), () => {
  console.log(`listening on ${appEnv.url || publicIP}`);
});