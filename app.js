module.exports = require('./lib/rabbithole')

if (module == process.mainModule) {
  var port = process.env.RABBITHOLE_PORT || 8165;
  module.exports.listen(port);
  console.log("listening on http://*:" + port);
}
