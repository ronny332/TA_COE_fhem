/**
 * Created by noname on 11/23/16.
 */

'use strict';

var coeData = function data() {
  const _ = require('lodash');

  const conf = require('./config.js');

  var data = {};

  _.each(conf.knots, function(knotData, knotSource) {
    data[knotSource] = new Array(16);

    _.each(data[knotSource], function(unused, index) {
      data[knotSource][index] = {
        date: 0,
        type: 0,
        value: 0
      };
    });
  });

  return data;
}();

module.exports = coeData;