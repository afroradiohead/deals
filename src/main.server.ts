// server.js
require('dotenv').config();
const request = require( 'request' );
const _ = require( 'lodash' );
const compression = require('compression');
const fs = require('fs');
const cheerio = require('cheerio');
const express = require('express');
const path = require('path');
const app = express();
const server = require('./server');
import * as Handlebars from 'handlebars';
const httpServer = app.listen(process.env.PORT || 8080);
const ___distdirname = `${__dirname}/../dist/`;

const cacheableRoutes = ['/', '/product/*'];

app.set('httpServer', httpServer);
app.use(compression());


new server.AppServer(app);
const detectBot = function(userAgent){
  const bots = [
    'googlebot',
    'bingbot',
    'yandexbot',
    'slurp',
    'baidu',
    'duckduck',
    'teoma',
    'twitterbot',
    'facebookexternalhit',
    'linkedinbot',
    'embedly',
    'facebot',
    'w3c_validator',
    'whatsapp'
  ];
  const agent = userAgent.toLowerCase();
  return bots.some((bot) => {
    const botDetected = agent.indexOf(bot) > -1;
    if (botDetected) {
      console.log('Bot detected', bot, agent);
    }
    return botDetected;
  });
};



const cachedRequest = function(req, res) {
  console.log('cached route hit', `${req.protocol}://${req.headers.host}${req.originalUrl}`);
  const $html = cheerio.load(fs.readFileSync(path.join(___distdirname, 'index.html')));
  res.set('Content-Type', 'text/html');
  res.set('Cache-Control', 'no-cache');

  const requestData = {
    method: 'POST',
    url: 'https://snapsearch.io/api/v1/robot',
    auth: {
      user: 'Saity1937@jourrapide.com',
      pass: 'hKPquG35r0c23rivUBW9l04t6c5A2uTzrzgCFPmON8Y2P222J7'
    },
    timeout: 1000,
    json: {
      url: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
      cachetime: 24 * 2
    },
    strictSSL: true,
    gzip: true
  };

  if (detectBot(req.get('User-Agent'))) {
    try {
      request(requestData, ( error, response, body ) => {
        const cachedHtml = _.get(body, 'content.html', null);
        if (cachedHtml) {
          res.send(cachedHtml);
        } else {
          res.send($html.html());
        }
        res.end();
      });
    } catch (ex) {
      res.sendFile(path.join(___distdirname, 'index.html'));
    }
  } else {
    res.sendFile(path.join(___distdirname, 'index.html'));
  }
};

app.get(cacheableRoutes, cachedRequest)
  .get('/robots.txt', (req, res) => {
    const template = fs.readFileSync(path.join(__dirname, '/server/robots.txt.hbs'), 'utf8');
    const compiledTemplate = Handlebars.compile(template);
    const txt = compiledTemplate({
      host: req.hostname
    });
    res.set('Content-Type', 'text/plain');
    res.send(txt);
    res.end();
  });


const bundlePaths = ['/styles.bundle.css', '/inline.bundle.js', '/polyfills.bundle.js', '/vendor.bundle.js'];
app
  .use(express.static(___distdirname))
  .use(express.static(`${___distdirname}/assets`))
  .get('*', function(req, res, next){
    if (bundlePaths.includes(req.url)) {
      return next();
    }
    console.log('non-cached route hit', `${req.protocol}://${req.headers.host}${req.originalUrl}`);
    res.set('Content-Type', 'text/html');
    res.sendFile(path.join(___distdirname, 'index.html'));
  });



