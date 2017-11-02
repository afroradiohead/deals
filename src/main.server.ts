// server.js
const request = require( 'request' );
const _ = require( 'lodash' );
const compression = require('compression');
const fs = require('fs');
const cheerio = require('cheerio');
const express = require('express');
const path = require('path');
const app = express();
const server = require('./server');
const httpServer = app.listen(process.env.PORT || 8080);
const ___distdirname = `${__dirname}/../dist/`;

app.set('httpServer', httpServer);
app.use(compression());


new server.AppServer(app);

const initialRequest = function(req, res) {
  const requestedRendered = _.has(req.query, 'rendered');
  const $html = cheerio.load(fs.readFileSync(path.join(___distdirname, 'index.html')));

  res.set('Content-Type', 'text/html');

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
        const $cachedHtml = cheerio.load(cachedHtml);
        $html('app-root').html($cachedHtml('app-root').html());
      }


      res.send($html.html());
      res.end();
    });
  } catch (ex) {
    res.send($html.html());
    res.end();
  }
};

app.get('/', initialRequest)
  .get('/robots.txt', (req, res) => {
    res.sendFile(path.join(___distdirname, 'assets/robots.txt'));
  });

app
  .use(express.static(___distdirname))
  .get('*', initialRequest);




