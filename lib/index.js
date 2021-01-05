"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "RequestAdapter", {
  enumerable: true,
  get: function () {
    return _requestAdapter.default;
  }
});
Object.defineProperty(exports, "BackendRequestAdapter", {
  enumerable: true,
  get: function () {
    return _backend.default;
  }
});
exports.default = void 0;

var _fakeAp = _interopRequireDefault(require("./fake-ap"));

var _requestAdapter = _interopRequireDefault(require("./request-adapter"));

var _backend = _interopRequireDefault(require("./request-adapter/backend"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _fakeAp.default;
exports.default = _default;