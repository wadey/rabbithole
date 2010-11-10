var amqp = require('amqp');

var AmqpClient = module.exports = function(host) {
  var connection = amqp.createConnection({host: host}),
      ready,
      exchanges = [],
      callbacks = [];

  connection.addListener('ready', function () {
    ready = true;
    console.log("connected: ", host);
    if (callbacks.length > 0) {
      callbacks.forEach(function(func) {
        func(c);
      });
      callbacks = [];
    }
  });

  function withClient(callback) {
    if (ready) {
      callback(connection);
    } else {
      callbacks.push(callback);
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
          var e = exchanges[exchange] || (exchanges[exchange] = conn.exchange(exchange));
          e.publish(routingKey, message);
        }
      });
    }
  }
}

