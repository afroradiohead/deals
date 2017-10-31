// server.js
const request = require( 'request' );
const _ = require( 'lodash' );
const seoBotDetect = require('seo-bot-detect');
const express = require('express');
const path = require('path');
const app = express();
const server = require('./server');
const httpServer = app.listen(process.env.PORT || 8080);
const ___distdirname = `${__dirname}/../dist/`;

app.set('httpServer', httpServer);


new server.AppServer(app);


const initialRequest = function(req, res) {
  if(seoBotDetect(req)) {
    try {
      request({
        method: 'POST',
        url: 'https://snapsearch.io/api/v1/robot',
        auth: {
          user: 'afroradiohead@gmail.com',
          pass: 'oSK8qca348m1RNC6f207ILt0Mz7pb4126MFHpR83thrTHkQamV'
        },
        timeout: 2000,
        json: {
          url: `${req.protocol}://${req.headers.host}${req.originalUrl}`
        },
        strictSSL: true,
        gzip: true
      }, ( error, response, body ) => {
        const html = _.get(body, 'content.html', null);
        if (html) {
          res.send(html);
        }else {
          res.sendFile(path.join(___distdirname, 'index.html'));
        }
      });
    } catch (ex) {
      res.sendFile(path.join(___distdirname, 'index.html'));
    }
  } else {
    res.sendFile(path.join(___distdirname, '/index.html'));
  }
};

app.get('/', initialRequest)
  .get('/delay', (req, res) => {
    setTimeout(() => {
      res.send(true);
      res.end();
    }, 3000);
  })
  .get('/robots.txt', (req, res) => {
    res.sendFile(path.join(___distdirname, 'assets/robots.txt'));
  });

app
  .use(express.static(___distdirname))
  .get('*', initialRequest);




