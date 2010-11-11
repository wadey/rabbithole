# rabbithole

Rabbithole provides a simple REST /publish endpoint for AMQP servers.

## How to run

The simplest way is to just execute `app.js` with `node`:

    node app.js                         # will run on port 8165 by default
    RABBITHOLE_PORT=9999 node app.js    # choose your own port

`app.js` also exports a Server instance, so you can run it with any NodeJS
server launcher. I like to use [spark](http://github.com/senchalabs/spark).
To start on port 8165:

    spark -p 8165 app.js

## Endpoints

### `POST /publish/:routingKey`

Publishes the POST body to the default exchange and the given routingKey.

### `POST /publish/:exchange/:routingKey`

Publishes the POST body to the given exchange and routingKey.

## TODO

* Add a long-polling interface for reading from a queue.
