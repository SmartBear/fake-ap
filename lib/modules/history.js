"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _signals = _interopRequireDefault(require("signals"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class History {
  constructor() {
    _defineProperty(this, "_state", '');

    _defineProperty(this, "_stateSignal", new _signals.default());

    _defineProperty(this, "back", function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.history.back'].concat(args));
    });

    _defineProperty(this, "forward", function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.history.forward'].concat(args));
    });

    _defineProperty(this, "go", function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.history.go'].concat(args));
    });

    _defineProperty(this, "getState", () => {
      return this._state;
    });

    _defineProperty(this, "popState", callback => {
      this._stateSignal.add(callback);
    });

    _defineProperty(this, "pushState", state => {
      window.location.hash = "#!".concat(state);
      this._state = state;

      this._stateSignal.dispatch(this._state);
    });

    _defineProperty(this, "replaceState", function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.history.replaceState'].concat(args));
    });

    _defineProperty(this, "_clearHistory", () => {
      window.location.hash = '';
      this._state = '';

      this._stateSignal.removeAll();
    });
  }

}

const history = new History();
var _default = history;
exports.default = _default;