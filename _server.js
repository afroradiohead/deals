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

app.use(require('prerender-node'));

new server.AppServer(app);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});
