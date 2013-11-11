var http = require('http');

exports.getlast = function (fiatOptions, callback) {
  var options = {
    host: 'api.bitcoinaverage.com',
    path: "/ticker/" + fiatOptions.fiat
  };

  http.request(options).on('response',function (response) {
    var data = '';
    response.on("data", function (chunk) {
      data += chunk;
    });
    response.on('end', function () {
      callback(JSON.parse(data));
    });
  }).end();

}