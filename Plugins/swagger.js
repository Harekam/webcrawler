'use strict';
/**
 * Created by harekam on 12/7/15.
 */

//Register Swagger
let pack = require('../package'),
    swaggerOptions = {
        info: {
            title: 'Web Crawler',
            version: pack.version
        },
        pathPrefixSize: 3
    };

exports.register = function (server, options, next) {

    server.register({
        register: require('hapi-swagger'),
        options: swaggerOptions
    }, (err) => {
        if (err) {
            server.log(['error'], 'hapi-swagger load error: ' + err)
        } else {
            server.log(['start'], 'hapi-swagger interface loaded')
        }
    });

    next();
};

exports.register.attributes = {
    name: 'swagger-plugin'
};