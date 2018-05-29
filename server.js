'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
// define some constants to make life easier
const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 3000;
const RADIX = 10;
const MONGO_DB_URL = 'mongodb://localhost:27017/bze-media';

const server = Hapi.server({
    host: process.env.HOST || DEFAULT_HOST, 
    port: parseInt(process.env.PORT, RADIX) || DEFAULT_PORT,
    app: {}
  });

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Welcome to the BZE Media API';
    }
});
const MediaController = require('./controllers/media');

server.route({
    method: 'GET',
    path: '/media',
    handler: MediaController.list,
});

server.route({
    method: 'GET',
    path: '/media/{id}',
    handler: MediaController.get,
});

server.route({
    method: 'POST',
    path: '/media',
    handler: MediaController.create,
});

server.route({
    method: 'PUT',
    path: '/media/{id}',
    handler: MediaController.update,
});

server.route({
    method: 'DELETE',
    path: '/media/{id}',
    handler: MediaController.remove,
});


const init = async () => {

    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: false,
            logEvents: ['response']
        }
    });

    await mongoose.connect(MONGO_DB_URL, {}).then(() => { console.log(`Connected to Mongo server`) }, err => { console.log(err) });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

try {
    init();
}
catch (err) {  
    console.log(err)
}
