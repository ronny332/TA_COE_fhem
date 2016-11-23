/**
 * Created by noname on 11/23/16.
 */

'use strict';

var format = function format() {
  const _ = require('lodash');

  const conf = require('./config'),
    data = require('./coe.data');

  // var jsonData = {};

  // _.each(data, function(knotData, knot) {
  //   if (_.has(conf.knots, knot)) {
  //     var index = 1;
  //
  //     _.each(knotData, function(knotCurrent) {
  //
  //       if (knotCurrent.type !== 0) {
  //         do {
  //           if (!_.has(jsonData, conf.knots[knot].name)) {
  //             jsonData[conf.knots[knot].name] = [];
  //           }
  //
  //           if (conf.knots[knot].input.analog[index + 16] !== false) {
  //             var newData = {
  //               index: index + 16,
  //               name: conf.knots[knot].input.analog[index + 16],
  //               value: types.getValueForType(knotCurrent.type, knotCurrent.value),
  //               unit: types.getType(knotCurrent.type).unit
  //             };
  //
  //             jsonData[conf.knots[knot].name].push(newData);
  //             break;
  //           }
  //           else {
  //             index++;
  //           }
  //
  //         } while (index <= 16)
  //
  //         index++;
  //       }
  //     });
  //   }
  // });

  //console.log(jsonData);

  function getMap() {
    var map = {};

    _.each(data, function(knotData, knot) {
      if (_.has(conf.knots, knot)) {
        if (!_.has(map, knot)) {
          map[knot] = {};
        }

        var index = 1;

        _.each(knotData, function(knotCurrent) {
          if (knotCurrent.type !== 0) {
            do {

              if (conf.knots[knot].input.analog[index + 16] !== false) {
                map[knot][index - 1] = index + 16;
                break;
              }
              else {
                index++;
              }

            } while (index <= 16)

            index++;
          }
          else {
            map[knot][index - 1] = false;
          }
        });
      }
    });

    return map;
  }

  return {
    getMap: getMap
  };
}();

module.exports = format;