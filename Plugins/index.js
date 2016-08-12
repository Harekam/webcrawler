/**
 * Created by harekam on 12/7/15.
 */
'use strict';
let Inert = require('inert'),
    Vision = require('vision');
module.exports = [
    Inert,
    Vision,
    {register: require('./swagger')},
    {register: require('./good-console')}
];