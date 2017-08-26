var Sockets = {
  init: function(server){
    Sockets.io = require('socket.io').listen(server);

    console.log('Sockets server initalized');

    Sockets.io.on('connection', function(socket){
      var tests = 0;

      console.log('[socket]', '"Someone" connected...');
      
      socket.emit('welcome', { thing: 'look, heres a string!'});

      setInterval(function(){
        socket.emit('test', tests++);
      }, 1000);

      socket.on('disconnect', function(){
        console.log('[socket]', '"Someone" left...');
      });
    });
    
    return Sockets;
  }
};

module.exports = Sockets;