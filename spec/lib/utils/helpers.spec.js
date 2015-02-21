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

  describe("#pluck", function() {
    var object = { a: { item: "hello" }, b: { item: "world" } },
        array = [ { item: "hello" }, { item: "world" } ];

    it("plucks values from a collection", function() {
      expect(_.pluck(object, "item")).to.be.eql(["hello", "world"]);
      expect(_.pluck(array, "item")).to.be.eql(["hello", "world"]);
    });
  });

  describe("#map", function() {
    var object = { a: { item: "hello" }, b: { item: "world" } },
        array = [ { item: "hello" }, { item: "world" } ];

    var fn = function(value, key) {
      return [value, key];
    };

    it("runs a function over items in a collection", function() {
      expect(_.map(object, fn)).to.be.eql([
        [{ item: "hello" }, "a"],
        [{ item: "world" }, "b"]
      ]);

      expect(_.map(array, fn)).to.be.eql([
        [{ item: "hello" }, 0],
        [{ item: "world" }, 1]
      ]);
    });
  });

  describe("#invoke", function() {
    var array = [
      {
        name: "bob",
        toString: function() {
          return "Hi from " + this.name;
        }
      },
      {
        name: "dave",
        toString: function() {
          return "hello from " + this.name;
        }
      }
    ];

    var object = {
      bob: {
        name: "bob",
        toString: function() {
          return "Hi from " + this.name;
        }
      },
      dave: {
        name: "dave",
        toString: function() {
          return "hello from " + this.name;
        }
      }
    };

    it("runs a instance function over items in a collection", function() {
      expect(_.invoke(object, "toString")).to.be.eql([
        "Hi from bob",
        "hello from dave"
      ]);

      expect(_.invoke(array, "toString")).to.be.eql([
        "Hi from bob",
        "hello from dave"
      ]);

      expect(_.invoke([1, 2, 3, 4, 5], Number.prototype.toString)).to.be.eql([
        "1", "2", "3", "4", "5"
      ]);
    });
  });

  describe("#each", function() {
    var object = { a: { item: "hello" }, b: { item: "world" } },
        array = [ { item: "hello" }, { item: "world" } ];

    var fn = function(value, key) {
      return [value, key];
    };

    it("runs a function over items in a collection", function() {
      fn = spy();
      _.map(object, fn);

      expect(fn).to.be.calledWith(object.a, "a");
      expect(fn).to.be.calledWith(object.b, "b");

      fn = spy();
      _.map(array, fn);

      expect(fn).to.be.calledWith(array[0], 0);
      expect(fn).to.be.calledWith(array[1], 1);
    });
  });

  describe("#arity", function() {
    it("creates a function that only takes a certain # of args", function() {
      var fn = spy();
      var one = _.arity(fn, 1);
      one("one", "two", "three");
      expect(fn).to.be.calledWith("one");
    });
  });
});
