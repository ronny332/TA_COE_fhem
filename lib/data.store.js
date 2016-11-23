/**
 * Created by noname on 11/23/16.
 */

'use strict';

var store = function store() {
  const path = require('path');

  const _ = require('lodash'),
    jsonfile = require('jsonfile');

  const conf = require('./config.js');

  var data = require('./coe.data');

  if (conf.data.store.enabled === true) {
    var file = path.format({
      dir: conf.data.store.path,
      base: conf.data.store.file
    });

    var oldData = {};

    try {
      oldData = jsonfile.readFileSync(file);
    }
    catch (ex) {
      console.info(ex);
    }

    _.each(oldData, function(d, knot) {
      if (_.has(data, knot) && data[knot].length == d.length) {
        data[knot] = d;
      }
    });

    setInterval(function() {
      jsonfile.writeFileSync(file, data);
    }, conf.data.store.interval);
  }
}();

module.exports = store;