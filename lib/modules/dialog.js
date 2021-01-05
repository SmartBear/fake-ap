"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _events = _interopRequireDefault(require("./events"));

var _mountComponent = require("../utils/mount-component");

var _config = _interopRequireDefault(require("../config"));

var _Dialogs = _interopRequireDefault(require("../components/Dialogs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Dialog {
  constructor() {
    _defineProperty(this, "create", options => {
      options.url = _config.default.dialogUrls[options.key];

      _events.default.emit('dialog.create', options);
    });

    _defineProperty(this, "close", data => {
      window.top.postMessage({
        type: 'AP.dialog.close',
        data: data
      });
    });

    _defineProperty(this, "getCustomData", callback => {
      window.addEventListener('message', event => {
        if (event.source !== window.top) {
          return;
        }

        if (typeof event.data !== 'object' && event.data.type !== 'AP.dialog.customData') {
          return;
        }

        callback(event.data.customData);
      });
      window.top.postMessage({
        type: 'AP.dialog.getCustomData'
      });
    });

    _defineProperty(this, "getButton", function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.dialog.getButton'].concat(args));
    });

    _defineProperty(this, "disableCloseOnSubmit", function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.dialog.disableCloseOnSubmit'].concat(args));
    });

    _defineProperty(this, "createButton", function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.dialog.createButton'].concat(args));
    });

    _defineProperty(this, "isCloseOnEscape", function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.dialog.isCloseOnEscape'].concat(args));
    });

    (0, _mountComponent.mountComponentWhenDocumentIsReady)( /*#__PURE__*/_react.default.createElement(_Dialogs.default, null), 'ap_dialogs');
  }

}

const dialog = new Dialog();
var _default = dialog;
exports.default = _default;