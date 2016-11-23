/**
 * Created by noname on 11/23/16.
 */

'use strict';

var telnet = function telnet() {
  const net = require('net');

  const conf = require('./config');

  function connect(cb) {
    var client = net.connect(conf.telnet.port, conf.telnet.host, function() {
      process.nextTick(function() {
        cb(client);
      });
    });

    client.on('error', function(err) {
      console.error(err);
    });

    // client.on('close', function() {
    //   console.log('closed');
    // });
  }

  function sendMessage(msg) {
    connect(function(client) {
      client.end('setreading ' + conf.telnet.dummy + ' ' + msg + "\n");
    });
  }

  return {
    sendMessage: sendMessage
  };
}();

module.exports = telnet;