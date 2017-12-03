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

  const requestData = {
    method: 'GET',
    url: 'https://snapsearch.io/api/v1/robot',
    auth: {
      user: 'afrocc22@gmail.com',
      pass: '19kcG0Dz2mtRm1PknID5987leyj45H5iRTNaLj791RT3C9VSzg'
    },
    timeout: 1000,
    json: {
      url: `${req.protocol}://${req.headers.host}${req.originalUrl}`
    },
    strictSSL: true,
    gzip: true
  };

  if (detectBot) {
    try {
      request(requestData, ( error, response, body ) => {
        const cachedHtml = _.get(body, 'content.html', null);
        if (cachedHtml) {
          res.send(cachedHtml);
        } else {
          request(_.extend(requestData, {method: 'POST'}));
          res.send($html.html());
        }
        res.end();
      });
    } catch (ex) {
      res.send($html.html());
      res.end();
    }
  } else {
    res.send($html.html());
    res.end();
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

app
  .use(express.static(___distdirname))
  .use(express.static(`${__dirname}/assets`))
  .get('*', function(req, res){
    console.log('non-cached route hit', `${req.protocol}://${req.headers.host}${req.originalUrl}`);
    const $html = cheerio.load(fs.readFileSync(path.join(___distdirname, 'index.html')));
    res.set('Content-Type', 'text/html');
    res.send($html.html());
    res.end();
  });



