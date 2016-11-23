/**
 * Created by noname on 11/23/16.
 */

'use strict';

var serverUdp = function serverUdp() {
  const dgram = require('dgram'),
    server = dgram.createSocket('udp4');

  const conf = require('./config');

  var callback = function() {
    console.info('message received, but no callback set');
  };

  server.on('error', function(err) {
    console.error('server error:', err.stack);
    server.close();
  });

  server.on('message', function(msg, rinfo) {
    if (conf.server.debug.enabled === true) {
      var raw = [];

      for (var i = 0; i < msg.length; i++) {
        raw.push(msg.readUInt8(i).toString(16));
      }

      console.info('debug:', raw.join(' '));
    }

    callback(msg, rinfo);
  });

  server.on('listening', function() {
    var address = server.address();
    console.info('server listening:', address.address + ':' + address.port);
  });

  server.bind(conf.server.port);

  var setMessageCallback = function setCallback(cb) {
    if (typeof(cb) == 'function') {
      callback = cb;
    }
  }

  return {
    setMessageCallback: setMessageCallback
  };
}();

module.exports = serverUdp;