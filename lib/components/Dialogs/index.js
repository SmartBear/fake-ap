"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styled = require("./styled");

var _events = _interopRequireDefault(require("../../modules/events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const styles = {
  iframe: {
    border: '0',
    width: '100%',
    height: '100%'
  }
};

const Dialogs = () => {
  const _useState = (0, _react.useState)(null),
        _useState2 = _slicedToArray(_useState, 2),
        dialog = _useState2[0],
        setDialog = _useState2[1];

  const iframeRef = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    _events.default.on('dialog.create', onDialogCreate);

    return () => {
      _events.default.off('dialog.create', onDialogCreate);
    };
  }, [dialog]);
  (0, _react.useEffect)(() => {
    _events.default.on('dialog.close', onDialogClose);

    return () => {
      _events.default.off('dialog.close', onDialogClose);
    };
  }, [dialog]);
  (0, _react.useEffect)(() => {
    window.addEventListener('message', onGetCustomDataMessage);
    return () => {
      window.removeEventListener('message', onGetCustomDataMessage);
    };
  }, [dialog]);
  (0, _react.useEffect)(() => {
    window.addEventListener('message', onCloseMessage);
    return () => {
      window.removeEventListener('message', onCloseMessage);
    };
  }, [dialog]);

  const onDialogCreate = options => {
    setDialog(options);
  };

  const onDialogClose = () => {
    setDialog(null);
  };

  const onGetCustomDataMessage = event => {
    if (!iframeRef.current || event.source !== iframeRef.current.contentWindow) {
      return;
    }

    if (typeof event.data !== 'object' || event.data.type !== 'AP.dialog.getCustomData') {
      return;
    }

    window.removeEventListener('message', onGetCustomDataMessage);
    event.source.postMessage({
      type: 'AP.dialog.customData',
      customData: dialog.customData
    });
  };

  const onCloseMessage = event => {
    if (typeof event.data !== 'object' || event.data.type !== 'AP.dialog.close') {
      return;
    }

    window.removeEventListener('message', onCloseMessage);

    _events.default.emit('dialog.close', event.data.data);
  };

  if (!dialog) {
    return null;
  }

  if (!dialog.url) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_styled.DialogsContainer, null, /*#__PURE__*/_react.default.createElement("iframe", {
    src: dialog.url,
    style: styles.iframe,
    ref: iframeRef,
    "data-testid": "ap-dialog"
  }));
};

var _default = Dialogs;
exports.default = _default;