"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("./config"));

var _context = _interopRequireDefault(require("./modules/context"));

var _cookie = _interopRequireDefault(require("./modules/cookie"));

var _dialog = _interopRequireDefault(require("./modules/dialog"));

var _events = _interopRequireDefault(require("./modules/events"));

var _flag = _interopRequireDefault(require("./modules/flag"));

var _history = _interopRequireDefault(require("./modules/history"));

var _host = _interopRequireDefault(require("./modules/host"));

var _iframe = _interopRequireDefault(require("./modules/iframe"));

var _inlineDialog = _interopRequireDefault(require("./modules/inline-dialog"));

var _jira = _interopRequireDefault(require("./modules/jira"));

var _navigator = _interopRequireDefault(require("./modules/navigator"));

var _request = _interopRequireDefault(require("./modules/request"));

var _user = _interopRequireDefault(require("./modules/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AP {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _defineProperty(this, "context", _context.default);

    _defineProperty(this, "cookie", _cookie.default);

    _defineProperty(this, "dialog", _dialog.default);

    _defineProperty(this, "events", _events.default);

    _defineProperty(this, "flag", _flag.default);

    _defineProperty(this, "history", _history.default);

    _defineProperty(this, "host", _host.default);

    _defineProperty(this, "inlineDialog", _inlineDialog.default);

    _defineProperty(this, "jira", _jira.default);

    _defineProperty(this, "navigator", _navigator.default);

    _defineProperty(this, "request", _request.default.request);

    _defineProperty(this, "resize", _iframe.default.resize);

    _defineProperty(this, "sizeToParent", _iframe.default.sizeToParent);

    _defineProperty(this, "user", _user.default);

    this.configure(options);
  }

  configure(options) {
    _config.default.setConfig(options);
  }

}

var _default = AP;
exports.default = _default;