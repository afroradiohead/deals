// server.js
const axios = require('axios');
const express = require('express');
const path = require('path');
const app = express();
const server = require('./server/dist/server/src');
const httpServer = app.listen(process.env.PORT || 8080);

app.use(require('prerender-node').set('prerenderToken', 'nfzgLQblqGsuWNQ9k0vY'));

app.use(express.static(__dirname + '/dist'))
  .set("httpServer", httpServer);

new server.AppServer(app);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));

  try {
    axios.post('http://api.prerender.io/recache', {
      data: {
        "prerenderToken": "nfzgLQblqGsuWNQ9k0vY",
        "url": `${req.protocol}://${req.headers.host}${req.originalUrl}`
      }
    }).catch(ex => {
      console.log('could not send request cache from prerender.io - 1')
    });
  } catch(ex) {
    console.log('could not send request cache from prerender.io - 2')
  }
});
