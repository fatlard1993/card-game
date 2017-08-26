const fs = require('fs');
const exec = require('child_process').exec;
const execFile = require('child_process').execFile;

const Express = require('express'), app = Express();
const HttpServer = require('http').createServer(app);
const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser');

const Sockets = require('./services/sockets.js');
const Errors = require('./services/error.js');

const HttpPort = 8080;

app.use(Express.static('./public'));

app.get('*', function redirectTrailingWak(req, res, next){
  var queryStringIndex = req.originalUrl.indexOf('?');
  var path = req.originalUrl.slice(0, ((queryStringIndex >= 0) ? queryStringIndex : req.originalUrl.length));

  if(path.slice(-1) !== '/') return next();

  var redirectPath = path.slice(0, (path.length - 1)) + ((queryStringIndex > -1) ? req.originalUrl.slice(queryStringIndex) : '');

  console.log('Redirecting '+ req.originalUrl +' to '+ redirectPath);

  res.redirect(301, redirectPath);
});

app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(CookieParser());

app.get('/test', function(req, res, next){
  console.log('Hit /test!');

  res.send('test');
});

app.use(Errors.four0four);

app.use(Errors.catch);

try{
  HttpServer.listen(HttpPort, function(){
    console.log('HTTP server is running!');

    Sockets.init(HttpServer);
  });
}
catch(e){
  console.error(e);
  console.log('Maybe node is already running?');
}