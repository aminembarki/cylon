// A collection of useful helper functions, used internally but not exported
// with the rest of Cylon.

"use strict";

var H = module.exports = {};

function extend(base, source) {
  var isArray = Array.isArray(source);

  if (base == null) {
    base = isArray ? [] : {};
  }

  if (isArray) {
    source.forEach(function(e, i) {
      if (typeof base[i] === "undefined") {
        base[i] = e;
      } else if (typeof e === "object") {
        base[i] = extend(base[i], e);
      } else {
        if (!~base.indexOf(e)) {
          base.push(e);
        }
      }
    });
  } else {
    var key;

    for (key in source) {
      if (typeof source[key] !== "object" || !source[key]) {
        base[key] = source[key];
      } else {
        if (base[key]) {
          extend(base[key], source[key]);
        } else {
          base[key] = source[key];
        }
      }
    }
  }

  return base;
}

extend(H, {
  extend: extend
});

function kind(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}

function isA(type) {
  return function(thing) {
    return kind(thing) === type;
  };
}

extend(H, {
  isObject:      isA("Object"),
  isObjectLoose: function(thing) { return typeof thing === "object"; },
  isFunction:    isA("Function"),
  isArray:       isA("Array"),
  isString:      isA("String"),
  isNumber:      isA("Number"),
  isArguments:   isA("Arguments"),
  isUndefined:   isA("Undefined")
});
