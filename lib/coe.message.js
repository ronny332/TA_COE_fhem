/**
 * Created by noname on 11/23/16.
 */

'use strict';

var coeMessage = function coeMessage() {
  const _ = require('lodash');

  const conf = require('./config'),
    types = require('./coe.types');

  const data = require('./coe.data'),
    format = require('./data.format'),
    telnet = require('./client.telnet');

  var handleMessage = function message(msg, rinfo) {
    if (msg.length != 14) {
      console.error('wrong message length:', msg.length + ' bytes, from ' + rinfo.address + ':' + rinfo.port);
      return;
    }

    var date = +new Date();

    for (var i = 0; i < 4; i++) {
      var knot = msg.readUInt8(0),
        index = (msg.readUInt8(1) - 1) * 4 + i,
        newType = msg.readUInt8(10 + i),
        newValue = msg.readInt16LE((i + 1) * 2);

      if (!conf.message.suppressDuplicates || data[knot][index].value !== newValue) {
        if (conf.message.preventErrors === true) {
          if (newValue === 0 && data[knot][index].value > 50) {
            console.info('prevented value/bus error for knot ' + knot + ' at index ' + index + ' (old: ' + data[knot][index].value + ', new: ' + newValue + ')');
            continue;
          }

          if (newType === 0  && data[knot][index].type > 0) {
            console.info('prevented value/bus error for knot ' + knot + ' at index ' + index + ' (old type: ' + data[knot][index].type + ', new type: ' + newType + ')');
            continue;
          }
        }

        data[knot][index].date = date;
        data[knot][index].type = newType;
        data[knot][index].value = newValue;

        // var updated = {
        //   value: types.getValueForType(data[knot][index].type, data[knot][index].value),
        //   unit: types.getType(data[knot][index].type).unit
        // };
        //
        // console.log(updated);
      }
    }

    var map = format.getMap();
    telnet.sendMessage('ok');

    // console.log(map);

    _.each(data, function(knotData, knot) {
      _.each(knotData, function(curData, index) {
        if (!!map[knot][index] && curData.date === date) {
          // console.log(knot, index, map[knot][index]);
          // console.log(conf.knots[knot].name, conf.knots[knot].input.analog[map[knot][index]], types.getValueForType(curData.type, curData.value), types.getType(curData.type).unit);

          telnet.sendMessage(conf.knots[knot].input.analog[map[knot][index]].split(' ').join('_') + ' ' + types.getValueForType(curData.type, curData.value).toFixed(1));
        }
      });
    });
  };

  return {
    handleMessage: handleMessage
  };
}();

module.exports = coeMessage;