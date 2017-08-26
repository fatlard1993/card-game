const exec = require('child_process').exec;

var headers = {
  '401': '401 - Unauthorized',
  '403': '403 - Forbidden',
  '404': '404 - Not Found',
  '500': '500 - Internal Server Error'
};

module.exports = {
  four0four: function(req, res, next){
    next({ detail: 'This page does not exist', status: 404 });
  },
  catch: function(err, req, res, next){
    console.error('Error catch!');

    if(!err.status){
      console.error('No Error Status Provided!');
      if(err instanceof Object) err.status = 500;
      else err = { err: err, status: 500 };
    }

    console.error(err);

    var detail = err.detail || JSON.stringify(err) || 'Unknown error!';

    res.status(err.status)[req.headers.accept && req.headers.accept === 'application/json' ? 'json' : 'send'](detail);
  }
};