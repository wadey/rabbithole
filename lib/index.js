var connect = require('connect');

var AmqpClient = require('./amqp_client');

// TODO make configurable
var amqpClient = AmqpClient('localhost');

var server = module.exports = connect.createServer(
  function(req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { data += chunk; });
    req.on('end', function() {
      req.body = data;
      next();
    });
  },

  connect.router(function(app) {
    app.get('/health', function(req, res) {
      res.writeHead(200);
      res.end("rabbithole: ok\n");
    });

    app.post('/publish/:exchange/:routingKey', function(req, res) {
      amqpClient.publish(req.params.exchange, req.params.routingKey, req.body);
      res.writeHead(200);
      res.end("ok");
    });

    app.post('/publish/:routingKey', function(req, res) {
      amqpClient.publish(req.params.routingKey, req.body);
      res.writeHead(200);
      res.end("ok");
    });
  })
);