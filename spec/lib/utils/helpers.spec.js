"use strict";

var _ = source("utils/helpers");

describe("Helpers", function() {
  describe("extend", function() {
    var extend = _.extend;

    var base = {
      fruits: ["apple"],
      vegetables: ["beet"],
      thing: null,
      otherThing: "hello!",
      data: [{ "user": "barney" }, { "user": "fred" }]
    };

    var source = {
      fruits: ["banana"],
      vegetables: ["carrot"],
      thing: "hello!",
      otherThing: null,
      data: [{ "age": 36 }, { "age": 40 }]
    };

    var expected = {
      data: [ { age: 36, user: "barney" }, { age: 40, user: "fred" } ],
      fruits: [ "apple", "banana" ],
      vegetables: [ "beet", "carrot" ],
      thing: "hello!",
      otherThing: null
    };

    it("extends two objects", function() {
      var extended = extend(base, source);
      expect(extended).to.be.eql(expected);
    });
  });

  describe("isObject", function() {
    var fn =_.isObject;

    it("checks if a value is an Object", function() {
      var Klass = function() {},
          instance = new Klass();

      expect(fn({})).to.be.eql(true);
      expect(fn(instance)).to.be.eql(true);

      expect(fn([])).to.be.eql(false);
      expect(fn(function() {})).to.be.eql(false);
      expect(fn(10)).to.be.eql(false);
      expect(fn("")).to.be.eql(false);
    });
  });

  describe("isFunction", function() {
    var fn =_.isFunction;

    it("checks if a value is a Function", function() {
      expect(fn(function() {})).to.be.eql(true);

      expect(fn({})).to.be.eql(false);
      expect(fn([])).to.be.eql(false);
      expect(fn(10)).to.be.eql(false);
      expect(fn("")).to.be.eql(false);
    });
  });

  describe("isArray", function() {
    var fn = _.isArray;

    it("checks if a value is an Array", function() {
      expect(fn([])).to.be.eql(true);

      expect(fn(function() {})).to.be.eql(false);
      expect(fn({})).to.be.eql(false);
      expect(fn(10)).to.be.eql(false);
      expect(fn("")).to.be.eql(false);
    });
  });

  describe("isNumber", function() {
    var fn = _.isNumber;

    it("checks if a value is a Number", function() {
      expect(fn(10)).to.be.eql(true);

      expect(fn(function() {})).to.be.eql(false);
      expect(fn({})).to.be.eql(false);
      expect(fn([])).to.be.eql(false);
      expect(fn("")).to.be.eql(false);
    });
  });

  describe("isString", function() {
    var fn = _.isString;

    it("checks if a value is a String", function() {
      expect(fn("")).to.be.eql(true);

      expect(fn(10)).to.be.eql(false);
      expect(fn(function() {})).to.be.eql(false);
      expect(fn({})).to.be.eql(false);
      expect(fn([])).to.be.eql(false);
    });
  });
});
