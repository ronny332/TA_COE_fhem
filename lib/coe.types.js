/**
 * Created by noname on 11/23/16.
 */

'use strict';

var types = function types() {
  const _ = require('lodash');

  const typeValues = {
    0: {
      decimals: 0,
      name: 'None',
      unit: ''
    },
    1: {
      decimals: 1,
      name: 'Temperature',
      unit: '°C'
    },
    4: {
      decimals: 0,
      name: 'Seconds',
      unit: 's'
    },
    10: {
      decimals: 1,
      name: 'KiloWatt',
      unit: 'kW'
    },
    11: {
      decimals: 1,
      name: 'KiloWattHours',
      unit: 'kWh'
    },
    12: {
      decimals: 0,
      name: 'MegaWattHours',
      unit: 'MWh'
    },
    17: {
      decimals: 2,
      name: 'Pressure',
      unit: 'Bar'
    }
  };

  function getValueForType(type, value) {
    return (_.has(typeValues, type) && typeValues[type].decimals > 0)
      ? parseFloat(value / (typeValues[type].decimals * 10))
      : value;
  }

  function getType(type) {
    return (_.has(typeValues, type)) ? typeValues[type] : typeValues[0];
  }

  return {
    getType: getType,
    getValueForType: getValueForType
  };
}();

module.exports = types;