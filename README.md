# rabbithole

Rabbithole provides a simple REST /publish endpoint for AMQP servers.

## How to run

You can run with any NodeJS server launcher. I like to use
[spark](http://github.com/senchalabs/spark). To start on port 8165:

    spark -p 8165

## Endpoints

### `POST /publish/:routingKey`

Publishes the POST body to the default exchange and the given routingKey.

### `POST /publish/:exchange/:routingKey`

Publishes the POST body to the given exchange and routingKey.
