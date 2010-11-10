var amqp = require('amqp');

var AmqpClient = module.exports = function(host) {
  var connection = amqp.createConnection({host: host}),
      ready,
      exchanges,
      queue = [];

  connection.addListener('ready', function () {
    ready = true;
    console.log("connected: ", host);
    if (queue.length > 0) {
      queue.forEach(function(func) {
        func(c);
      });
      queue = [];
    }
  });

  function withClient(callback) {
    if (ready) {
      callback(connection);
    } else {
      queue.push(callback);
    }
  }

  return {
    publish: function(exchange, routingKey, message) {
      withClient(function(conn) {
        if (message === undefined) {
          message = routingKey;
          routingKey = exchange;
          console.log("connection.publish: ", routingKey, message);
          conn.publish(routingKey, message);
        } else {
          console.log("exchange.publish: ", exchange, routingKey, message);
          // TODO cache exchange objects
          conn.exchange(exchange).publish(routingKey, message);
        }
      });
    }
  }
}

