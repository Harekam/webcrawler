'use strict';
/**
 * Created by harekam on 12/7/15.
 */
let Good = require('good');

//Register Good Console

exports.register = function (server, options, next) {

    server.register({
        register: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: {
                    response: '*',
                    error: '*',
                    log: '*'
                }
            }]
        }
    }, (err) => {
        if (err) {
            throw err;
        }
    });

    next();
};

exports.register.attributes = {
    name: 'good-console-plugin'
};