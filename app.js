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

fs.readFile(__dirname +'/users.json', function(err, data){
  var Users = JSON.parse(data);

  console.log(Users[0]);

  app.use(Express.static('./public'));
  
  app.get('/', function(req, res, next){
    console.log('rediredcing root to login');
  
    res.redirect('/login');
  });
  
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
  
  
  app.post('/login', function(req, res, next){
    console.log('Hit POST /login!', req.body);

    var result = 'no matching userename';

    for(var i = 0; i < Users.length; i++){
      if(Users[i].name === req.body.username){
        if(Users[i].password === req.body.password) result = 'correct password';
        else result = 'wrong password';
      }
    }

    console.log(result);

    if(result === 'correct password') return res.send('hip hip horray');
  
    next({
      status: 409,
      detail:'u suk'
    });
  });
  
  app.get('/login', function(req, res, next){
    console.log('Hit /login!');
  
    res.sendFile(__dirname +'/public/login.html');
  });
  
  app.get('*', function(req, res, next){
    //check cookie
  
    //if cookie return next()
  
    //else
    console.log('redirecting to login...');
    res.redirect('/login');
  });
  
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
});