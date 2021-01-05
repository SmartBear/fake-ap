"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Request {
  constructor() {
    _defineProperty(this, "request", async function (url) {
      var _options$type;

      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const requestInformation = {
        method: ((_options$type = options.type) === null || _options$type === void 0 ? void 0 : _options$type.toUpperCase()) || 'GET',
        path: url,
        data: options.data || {}
      };
      return await _config.default.requestAdapter.request(requestInformation);
    });
  }

}

const request = new Request();
var _default = request;
exports.default = _default;