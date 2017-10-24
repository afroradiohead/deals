// server.js
const snapsearch = require('snapsearch-client-nodejs');
const axios = require('axios');
const express = require('express');
const path = require('path');
const app = express();
const server = require('./server/dist/server/src');
const httpServer = app.listen(process.env.PORT || 8080);

app.set("httpServer", httpServer);


// app.use(snapsearch.connect(
//   new snapsearch.Interceptor(
//     new snapsearch.Client('ENTER YOUR EMAIL', 'ENTER YOUR KEY', {}, function (error, debugging) {
//       //mandatory custom exception handler for Client errors such as HTTP errors or validation errors from the API
//       console.log(error);
//       // error is a SnapSearchException containing a message and errorDetails which can acquired from `getMessage()` `getErrors()`
//       console.log(debugging);
//       // debugging is an object containing these: {apiUrl, apiKey, apiEmail, requestParameters}
//       // if an exception happens, the middleware is a no-op and passes through to the next stage of your application
//     }),
//     new snapsearch.Detector()
//   )
// ));

new server.AppServer(app);


const initialRequest = function(req, res) {
  try {
    const snapSearchClient = new snapsearch.Client('afroradiohead@gmail.com', 'oSK8qca348m1RNC6f207ILt0Mz7pb4126MFHpR83thrTHkQamV', {});

  } catch(ex) {
    console.log('snapsearch threw an error');
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  }
};

app.get('/', initialRequest);
// @todo fix the way this look, cuz it's weird that i gotta duplicate code
app
  .use(express.static(__dirname + '/dist'))
  .get('*', initialRequest);

