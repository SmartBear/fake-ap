"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _httpStatusCodes = require("http-status-codes");

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BackendRequestAdapter extends _index.default {
  constructor(url) {
    super();
    this.url = url;
    this.client = _axios.default.create();
  }

  async request(options) {
    const response = await this.client.post(this.url, options);
    const _response$data = response.data,
          status = _response$data.status,
          body = _response$data.body;
    const responseBody = typeof body === 'string' ? body : JSON.stringify(body);

    if (status < 200 || status >= 300) {
      const error = {
        err: responseBody,
        xhr: {
          responseText: responseBody,
          status: status,
          statusText: (0, _httpStatusCodes.getReasonPhrase)(status)
        }
      };
      throw error;
    }

    return {
      body: responseBody
    };
  }

}

var _default = BackendRequestAdapter;
exports.default = _default;