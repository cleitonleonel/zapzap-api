const fs = require('fs');
const https = require('https');
const express = require("express");
const Sessions = require("./sessions");
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
//const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

const app = express();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000

app.use(express.static('static'));
app.use(cors());
app.use(express.json());

//app.use(cookieParser());

app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

/*

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

*/

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      res.redirect('/login');
  } else {
    next();
  }
};

app.get('/', sessionChecker, (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => res.sendFile(path.join(__dirname+'/templates/index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname+'/templates/register.html')));
app.get('/testing', (req, res) => res.sendFile(path.join(__dirname+'/templates/testing.html')));

app.use('/api', routes);

if (process.env.HTTPS === 1) {
  https.createServer(
    {
      key: fs.readFileSync(process.env.SSL_KEY_PATH),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH)
    },
    app).listen(PORT, HOST);
  console.log("Https server running on port " + 'https://' + HOST + ':' + PORT);
} else {
  app.listen(PORT, HOST,() => {
    console.log("Http server running on port " + 'http://' + HOST + ':' + PORT);
  });
}

process.stdin.resume();

async function exitHandler(options, exitCode) {
    if (options.cleanup) {
        console.log('cleanup');
        await Sessions.getSessions().forEach(session => {
            Sessions.closeSession(session.sessionName);
        });
    }
    if (exitCode || exitCode === 0) {
        console.log(exitCode);
    }

    if (options.exit) {
        process.exit();
    }
}

process.on('exit', exitHandler.bind(null, { cleanup: true }));
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

module.exports = app;