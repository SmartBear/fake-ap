"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var jwt = _interopRequireWildcard(require("atlassian-jwt"));

var _moment = _interopRequireDefault(require("moment"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Context {
  constructor() {
    _defineProperty(this, "getToken", async () => {
      if (!_config.default.clientKey) {
        return _config.default.missingConfiguration('AP.context.getToken', 'clientKey');
      }

      if (!_config.default.sharedSecret) {
        return _config.default.missingConfiguration('AP.context.getToken', 'sharedSecret');
      }

      if (!_config.default.userId) {
        return _config.default.missingConfiguration('AP.context.getToken', 'userId');
      }

      const now = (0, _moment.default)().utc();
      const payload = {
        iss: _config.default.clientKey,
        sub: _config.default.userId,
        iat: now.unix(),
        exp: now.add(5, 'minutes').unix()
      };
      return jwt.encode(payload, _config.default.sharedSecret);
    });

    _defineProperty(this, "getContext", async function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.context.getContext'].concat(args));
    });
  }

}

const context = new Context();
var _default = context;
exports.default = _default;