/**
 * Created by noname on 11/22/16.
 */

'use strict';

const _ = require('lodash');

const server = require('./lib/server.udp'),
  message = require('./lib/coe.message'),
  store = require('./lib/data.store');

var format = require('./lib/data.format');

server.setMessageCallback(message.handleMessage);