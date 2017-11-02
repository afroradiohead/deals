// server.js
const request = require( 'request' );
const _ = require( 'lodash' );
const compression = require('compression');
const fs = require('fs');
const seoBotDetect = require('seo-bot-detect');
const express = require('express');
const path = require('path');
const app = express();
const server = require('./server');
const httpServer = app.listen(process.env.PORT || 8080);
const ___distdirname = `${__dirname}/../dist/`;

app.set('httpServer', httpServer);
app.use(compression());

function RemoveParameterFromUrl(url, parameter) {
  return url
    .replace(new RegExp('[?&]' + parameter + '=[^&#]*(#.*)?$'), '$1')
    .replace(new RegExp('([?&])' + parameter + '=[^&]*&'), '$1');
}

new server.AppServer(app);

const initialRequest = function(req, res) {
  const requestedRendered = _.has(req.query, 'rendered');
  const html = fs.readFileSync(path.join(___distdirname, 'index.html'));
  // @todo append canonical url to head in html


  res.set('Content-Type', 'text/html');

  if (requestedRendered) {
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
        const cachedHtml = _.get(body, 'content.html', null);

        if (cachedHtml) {
          res.send(cachedHtml);
        } else {
          res.send(html);
        }
        res.end();
      });
    } catch (ex) {
      res.send(html);
      res.end();
    }
  } else {
    res.send(html);
    res.end();
  }
};

app.get('/', initialRequest)
  .get('/rendered-direct', (req, res) => {
    const redirectedUrl = RemoveParameterFromUrl(req.header('Referer'), 'rendered');

    // if (!seoBotDetect(req)) {
    //     res.send(`window.location.href = "${redirectedUrl}";`);
    // }
    // res.end();
  })
  .get('/robots.txt', (req, res) => {
    res.sendFile(path.join(___distdirname, 'assets/robots.txt'));
  });

app
  .use(express.static(___distdirname))
  .get('*', initialRequest);




