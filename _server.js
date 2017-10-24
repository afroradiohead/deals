// server.js
const express = require('express');
const path = require('path');
const app = express();
const httpServer = app.listen(process.env.PORT || 8080);
const server = require('./server/dist/server/src');
const snapsearch = require('snapsearch-client-nodejs');
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'))
  .set("httpServer", httpServer);

app.use(snapsearch.connect(
  new snapsearch.Interceptor(
    new snapsearch.Client('afroradiohead@gmail.com', 'oSK8qca348m1RNC6f207ILt0Mz7pb4126MFHpR83thrTHkQamV', {}, function (error, debugging) {
      //mandatory custom exception handler for Client errors such as HTTP errors or validation errors from the API
      console.log(error);
      // error is a SnapSearchException containing a message and errorDetails which can acquired from `getMessage()` `getErrors()`
      console.log(debugging);
      // debugging is an object containing these: {apiUrl, apiKey, apiEmail, requestParameters}
      // if an exception happens, the middleware is a no-op and passes through to the next stage of your application
    }),
    new snapsearch.Detector()
  )
));
new server.AppServer(app);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});
