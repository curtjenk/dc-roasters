var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8200, function() {
  console.log(' -------- DC Roasters Coffee Site -----------');
  console.log('Directory = ' + __dirname);
  console.log('Listening on port 8200...');

});