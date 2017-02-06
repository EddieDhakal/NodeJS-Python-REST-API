'use strict';

const
    restify = require('restify'),
    postHandler = require('./handlers/foods-post');

const
    tcpPort = process.env.PORT || 6543,
    server = restify.createServer({
        formatters: {
            'application/json': (request, response, body, cb) => {

                try {
                    return cb(null, JSON.stringify(body, null, '    '));
                }
                catch (e) {
                    response.statusCode = 400;
                    response.send({
                        error: 'Could not decode request: JSON parsing failed'
                    });
                }
            }
        }
    });


// Makes the JSON data from the HTTP request accessible
server.use(restify.bodyParser());


// Binds the HTTP post URL to the handler
server.post('/', postHandler);


// Starts listening
server.listen(tcpPort, () => {
    console.log(`${server.name} is listening at ${server.url}.`);
});


// Handles the malformed JSON data from the HTTP request
server.on('InvalidContent', (request, response) => {
    response.statusCode = 400;
    response.send({
        error: 'Could not decode request: JSON parsing failed'
    });
});
