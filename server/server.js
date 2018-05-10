'use strict';

const express = require('express')()
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');
const bodyParser = require('body-parser');
const next = require('next')
const { parse } = require('url')
require('now-env')

const connectWithDB = require('./initDb');
connectWithDB(process.env.db_connection_string);

process.on('uncaughtException', function(err) {
  console.log('Uncaught Exception: ' + err)
})

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection: Promise:', p, 'Reason:', reason)
})

if (process.env.node_env == 'development') {
  process.env.port = 3000
}

// Default when run with `npm start` is 'production' and default port is '80'
// `npm run dev` defaults mode to 'development' & port to '3000'
process.env.node_env = process.env.node_env || 'production'
process.env.port = process.env.port || 80

const nextApp = next({
  dir: '.',
  dev: (process.env.node_env === 'development')
})
const handle = nextApp.getRequestHandler()

nextApp.prepare()
    .then(() => {
        // Load body parser to handle POST requests
        express.use(bodyParser.json())
        express.use(bodyParser.urlencoded({extended: true}))

        express.all('*', function(req, res, next) {
          if (req.url.indexOf('/api/') !== -1) {
            //handle api methods
            return next();
          }

          // Be sure to pass `true` as the second argument to `url.parse`.
          // This tells it to parse the query portion of the URL.
          const parsedUrl = parse(req.url, true)
          const { pathname, query } = parsedUrl

          return handle(req, res, parsedUrl)
        });

        var jwtCheck = jwt({
          secret: jwks.expressJwtSecret({
              cache: true,
              rateLimit: true,
              jwksRequestsPerMinute: 5,
              jwksUri: "https://project_name.auth0.com/.well-known/jwks.json"
          }),
          audience: 'https://project_name.io/api',
          issuer: "https://project_name.auth0.com/",
          algorithms: ['RS256']
        });
          
        // This route doesn't need authentication
        express.get('/api/public', function(req, res) {
          res.json({
            message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
          });
        });

        // This route need authentication
        express.get('/api/private', jwtCheck, function(req, res) {
          res.json({
            message: 'Hello from a private endpoint! You need to be authenticated to see this.'
          });
        });

        express.listen(process.env.port, err => {
          if (err) {
            throw err
          }
          console.log('> Ready on http://localhost:' + process.env.port + ' [' + process.env.node_env + ']')
        })
    })
