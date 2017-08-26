/* global Reqx, Socket */

var Req = new Reqx();

function Load(){
  var Content = document.getElementById('content');

  Req.get('/test', function(err, result){
    if(err) return console.error(err);

    console.log(result);

    Socket.init(function(){
      console.log('Socket connection established');

      Content.textContent = 'loaded';
    });
  });
}

document.addEventListener('DOMContentLoaded', Load);