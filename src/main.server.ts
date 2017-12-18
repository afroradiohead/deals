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

const cachedRequest = function(req, res) {
  console.log('cached route hit', `${req.protocol}://${req.headers.host}${req.originalUrl}`);
  const $html = cheerio.load(fs.readFileSync(path.join(___distdirname, 'index.html')));
  res.set('Content-Type', 'text/html');

  const requestData = {
    method: 'POST',
    url: 'https://snapsearch.io/api/v1/robot',
    auth: {
      user: 'Hileed1979@superrito.com',
      pass: '3DYNS07oR23HnAaC2t9zRZH5Wj89Eu09hwlY7B73tuLa25orbq'
    },
    timeout: 1000,
    json: {
      url: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
      cachetime: 24 * 3
    },
    strictSSL: true,
    gzip: true
  };

  try {
    request(requestData, ( error, response, body ) => {
      const cachedHtml = _.get(body, 'content.html', null);

      if (cachedHtml) {
        const $cachedHtml = cheerio.load(cachedHtml);
        $html('app-root').html($cachedHtml('app-root').html());
        $html('title').remove();
        $html('head').append($cachedHtml('title'));
        $html('head').append($cachedHtml('meta'));
      }

      res.send($html.html());
      res.end();
    });
  } catch (ex) {
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



