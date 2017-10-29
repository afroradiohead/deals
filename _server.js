// server.js
const request = require( 'request' );
const _ = require( 'lodash' );
const seoBotDetect = require('seo-bot-detect');
const express = require('express');
const path = require('path');
const app = express();
const server = require('./server/dist/server/src');
const httpServer = app.listen(process.env.PORT || 8080);

app.set("httpServer", httpServer);


new server.AppServer(app);


const initialRequest = function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
};

app.get('/', initialRequest)
  .get('/delay', (req, res) => {
    setTimeout(() => {
      res.send(true);
      res.end();
    }, 3000);
  });

app
  .use(express.static(__dirname + '/dist'))
  .get('*', initialRequest);


