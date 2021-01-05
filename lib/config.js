"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _requestAdapter = _interopRequireDefault(require("./request-adapter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Config {
  constructor() {
    var _this = this;

    _defineProperty(this, "setConfig", config => {
      var _config$clientKey, _config$sharedSecret, _config$userId, _config$dialogUrls, _config$locale;

      if (typeof config.notImplementedAction === 'function') {
        this.notImplemented = config.notImplementedAction;
      }

      if (typeof config.missingConfigurationAction === 'function') {
        this.missingConfiguration = config.missingConfigurationAction;
      }

      if (config.requestAdapter instanceof _requestAdapter.default) {
        this.requestAdapter = config.requestAdapter;
      }

      this.clientKey = (_config$clientKey = config.clientKey) !== null && _config$clientKey !== void 0 ? _config$clientKey : this.clientKey;
      this.sharedSecret = (_config$sharedSecret = config.sharedSecret) !== null && _config$sharedSecret !== void 0 ? _config$sharedSecret : this.sharedSecret;
      this.userId = (_config$userId = config.userId) !== null && _config$userId !== void 0 ? _config$userId : this.userId;
      this.dialogUrls = (_config$dialogUrls = config.dialogUrls) !== null && _config$dialogUrls !== void 0 ? _config$dialogUrls : this.dialogUrls;
      this.locale = (_config$locale = config.locale) !== null && _config$locale !== void 0 ? _config$locale : this.locale;
    });

    _defineProperty(this, "resetConfig", () => {
      this.notImplemented = () => {};

      this.missingConfiguration = (method, configuration) => {
        throw new Error("Missing configuration for ".concat(method, ": ").concat(configuration));
      };

      this.requestAdapter = new _requestAdapter.default(function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _this.notImplemented.apply(_this, ['AP.request'].concat(args));
      });
      this.clientKey = null;
      this.sharedSecret = null;
      this.userId = null;
      this.dialogUrls = {};
      this.locale = null;
    });

    this.resetConfig();
  }

}

const config = new Config();
var _default = config;
exports.default = _default;