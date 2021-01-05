"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class RequestAdapter {
  constructor() {
    let notImplemented = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};
    this.notImplemented = notImplemented;
  }

  async request() {
    this.notImplemented.apply(this, arguments);
    return {
      body: JSON.stringify({})
    };
  }

}

var _default = RequestAdapter;
exports.default = _default;