// server.js
const axios = require('axios');
const express = require('express');
const path = require('path');
const app = express();
const server = require('./server/dist/server/src');
const httpServer = app.listen(process.env.PORT || 8080);

app.use(require('prerender-node').set('prerenderToken', 'nfzgLQblqGsuWNQ9k0vY'));
app.set("httpServer", httpServer);

new server.AppServer(app);


const initialRequest = function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));

  try {
    axios.post('http://api.prerender.io/recache', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        prerenderToken: "nfzgLQblqGsuWNQ9k0vY",
        url: `${req.protocol}://${req.headers.host}${req.originalUrl}`
      }
    }).then(e => {
      console.log('prerender worked');
    }).catch(ex => {
      console.log(ex.response.data)
    });
  } catch(ex) {
    console.log('could not send request cache from prerender.io - 2')
  }
};

app.get('/', initialRequest);
// @todo fix the way this look, cuz it's weird that i gotta duplicate code
app
  .use(express.static(__dirname + '/dist'))
  .get('*', initialRequest);

