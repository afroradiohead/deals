// server.js
const express = require('express');
const path = require('path');
const app = express();
const server = require('./server/dist/server/src');

app.use(require('prerender-node').set('prerenderToken', 'nfzgLQblqGsuWNQ9k0vY'));

const httpServer = app.listen(process.env.PORT || 8080);
app.use(express.static(__dirname + '/dist'))
  .set("httpServer", httpServer);
new server.AppServer(app);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});
