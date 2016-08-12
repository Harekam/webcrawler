/**
 * Created by harekamsingh on 8/10/16.
 */
'use strict';

const Hapi = require('hapi'),
    Plugins = require('./Plugins'),
    mongoose = require('mongoose'),
    config = require('./Config'),
    Routes = require('./Routes');
//mongoose.set('debug', true);

const PORT = config.serverConfig.PORT.LIVE,
    MONGO_DB_URI = config.dbConfig.mongodbURI.local;
const server = new Hapi.Server();

var connectionOptions = {
    port: PORT,
    routes: {
        cors: true
    }
};

server.connection(connectionOptions);

/**
 * Plugins
 */
server.register(Plugins, function (err) {
    if (err) {
        server.error('Error while loading Plugins : ' + err)
    } else {
        server.log('info', 'Plugins Loaded')
    }

});
// API Routes
Routes.forEach(function (api) {
    server.route(api);
});
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        return reply('Welcome to Review Crawler!');
    }
});

//Connect to MongoDB
mongoose.connect(MONGO_DB_URI, (err)=> {
    if (err) {
        server.log("DB Error: ", err);
        process.exit(1);
    } else {
        server.log('MongoDB Connected at', MONGO_DB_URI);
    }
});

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    server.log('Server running at:', server.info.uri);
});
