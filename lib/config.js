/**
 * Created by noname on 11/22/16.
 */

'use strict';

var json = function knots() {
  const jsonfile = require('jsonfile');

  var file = './config.json',
    config = jsonfile.readFileSync(file);

  return config;
}();

module.exports = json;