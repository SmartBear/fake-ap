"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _events = _interopRequireDefault(require("./events"));

var _mountComponent = require("../utils/mount-component");

var _Flags = _interopRequireDefault(require("../components/Flags"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Flag {
  constructor() {
    _defineProperty(this, "_nextId", 1);

    _defineProperty(this, "create", options => {
      var _options$title, _options$body, _options$actions;

      const id = this._nextId;
      const title = (_options$title = options.title) !== null && _options$title !== void 0 ? _options$title : '';
      const body = (_options$body = options.body) !== null && _options$body !== void 0 ? _options$body : '';
      const type = ['info', 'success', 'warning', 'error'].includes(options.type) ? options.type : 'info';
      const close = ['manual', 'auto'].includes(options.close) ? options.close : 'manual';
      const actions = (_options$actions = options.actions) !== null && _options$actions !== void 0 ? _options$actions : {};

      _events.default.emit('flag.create', {
        id: id,
        options: {
          title: title,
          body: body,
          type: type,
          close: close,
          actions: actions
        }
      });

      this._nextId = this._nextId + 1;
      return {
        close: () => {
          _events.default.emit('flag.close', id);
        }
      };
    });

    (0, _mountComponent.mountComponentWhenDocumentIsReady)( /*#__PURE__*/_react.default.createElement(_Flags.default, null), 'ap_flags');
  }

}

const flag = new Flag();
var _default = flag;
exports.default = _default;