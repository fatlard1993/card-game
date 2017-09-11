/* global Reqx, Socket */

var Req = new Reqx();

function Load(){
  var Content = document.getElementById('content');

  function pointerUp(evt){
    if(evt.target.id === 'loginButton'){
      evt.preventDefault();
      
      var loginInformation = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
      };

      Req.post('/login', loginInformation, function(err, response){
        if(err){
          console.error(err);
          return;
        }

        console.log(response);

      });
    }
  }

  document.addEventListener('mouseup', pointerUp);

  document.addEventListener('touchend', pointerUp);
}

document.addEventListener('DOMContentLoaded', Load);