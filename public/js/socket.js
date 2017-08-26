/* global io */

var Socket = {
  init: function(cb){
    Socket.activeSocket = io();
  
    Socket.disconnect = function(message){
      console.warn('Closing socket connection: ', message);

      Socket.activeSocket.close();

      setTimeout(function(){ window.location.reload(false); }, 6000);
    };
    
    Socket.activeSocket.on('welcome', function(data){
      console.log('socket', 'Welcome data: ', data);
      
      if(cb) cb(data);
    });

    Socket.activeSocket.on('test', console.log);

    Socket.activeSocket.on('reload', function(delay){
      setTimeout(function(){ window.location.reload(false); }, delay);
    });
  
    Socket.activeSocket.on('get out', Socket.disconnect);
  
    Socket.activeSocket.on('connect_error', function(err){
      console.error('connect_error', err);
      
      Socket.disconnect('Communication has been severed!');
    });
  }
};