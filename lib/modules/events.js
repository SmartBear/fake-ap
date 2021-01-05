"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _signals = _interopRequireDefault(require("signals"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Events {
  constructor() {
    _defineProperty(this, "_eventNames", {});

    _defineProperty(this, "on", (name, listener) => {
      if (this._eventNames[name] === undefined) {
        this._eventNames[name] = new _signals.default();
      }

      this._eventNames[name].add(listener);
    });

    _defineProperty(this, "onPublic", function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.events.onPublic'].concat(args));
    });

    _defineProperty(this, "once", (name, listener) => {
      if (this._eventNames[name] === undefined) {
        this._eventNames[name] = new _signals.default();
      }

      this._eventNames[name].addOnce(listener);
    });

    _defineProperty(this, "oncePublic", function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.events.oncePublic'].concat(args));
    });

    _defineProperty(this, "onAny", function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.events.onAny'].concat(args));
    });

    _defineProperty(this, "onAnyPublic", function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.events.onAnyPublic'].concat(args));
    });

    _defineProperty(this, "off", (name, listener) => {
      if (this._eventNames[name] !== undefined) {
        this._eventNames[name].remove(listener);
      }
    });

    _defineProperty(this, "offPublic", function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.events.offPublic'].concat(args));
    });

    _defineProperty(this, "offAll", function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.events.offAll'].concat(args));
    });

    _defineProperty(this, "offAllPublic", function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.events.offAllPublic'].concat(args));
    });

    _defineProperty(this, "offAny", function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.events.offAny'].concat(args));
    });

    _defineProperty(this, "offAnyPublic", function () {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.events.offAnyPublic'].concat(args));
    });

    _defineProperty(this, "emit", (name, args) => {
      if (this._eventNames[name] !== undefined) {
        this._eventNames[name].dispatch(args);
      }
    });

    _defineProperty(this, "emitPublic", function () {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.events.emitPublic'].concat(args));
    });
  }

}

const events = new Events();
var _default = events;
exports.default = _default;