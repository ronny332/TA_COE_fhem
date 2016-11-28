/**
 * Created by noname on 11/24/16.
 */

'use strict';

const dgram = require('dgram');
const message = Buffer.from('Some bytes');

const client = dgram.createSocket('udp4');

var buf = Buffer.alloc(14);
buf.writeUInt8(0x30, 0);
buf.writeUInt8(0x01, 1);
buf.writeInt16LE(211, 2);
buf.writeUInt8(1, 10);

client.send(buf, 0, buf.length, 5441, '10.0.0.46', function(err) {
  client.close();
});