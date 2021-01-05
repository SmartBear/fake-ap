"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _icons = require("./icons");

var _styled = require("./styled");

var _events = _interopRequireDefault(require("../../modules/events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const Flag = (_ref) => {
  let title = _ref.title,
      body = _ref.body,
      type = _ref.type,
      actions = _ref.actions,
      closeFlag = _ref.closeFlag;

  const onActionClick = actionIdentifier => {
    _events.default.emit('flag.action', {
      actionIdentifier: actionIdentifier
    });
  };

  let TypeIcon = _icons.InfoIcon;
  let iconColor = '#6554C0';

  switch (type) {
    case 'info':
      TypeIcon = _icons.InfoIcon;
      iconColor = '#6554C0';
      break;

    case 'success':
      TypeIcon = _icons.SuccessIcon;
      iconColor = '#36B37E';
      break;

    case 'warning':
      TypeIcon = _icons.WarningIcon;
      iconColor = '#FF991F';
      break;

    case 'error':
      TypeIcon = _icons.ErrorIcon;
      iconColor = '#DE350B';
  }

  actions = Object.entries(actions).map((_ref2) => {
    let _ref3 = _slicedToArray(_ref2, 2),
        actionIdentifier = _ref3[0],
        text = _ref3[1];

    return {
      actionIdentifier: actionIdentifier,
      text: text
    };
  });
  return /*#__PURE__*/_react.default.createElement(_styled.FlagContainer, null, /*#__PURE__*/_react.default.createElement(_styled.TypeIconContainer, {
    color: iconColor
  }, /*#__PURE__*/_react.default.createElement(TypeIcon, null)), /*#__PURE__*/_react.default.createElement(_styled.CloseIconContainer, {
    onClick: closeFlag
  }, /*#__PURE__*/_react.default.createElement(_icons.CloseIcon, null)), /*#__PURE__*/_react.default.createElement(_styled.Message, null, /*#__PURE__*/_react.default.createElement(_styled.Title, null, title), body, /*#__PURE__*/_react.default.createElement(_styled.Actions, null, actions.map(action => /*#__PURE__*/_react.default.createElement(_styled.ActionButton, {
    key: action.actionIdentifier,
    onClick: () => onActionClick(action.actionIdentifier)
  }, /*#__PURE__*/_react.default.createElement(_styled.ActionText, null, action.text))))));
};

const Flags = () => {
  const _useState = (0, _react.useState)([]),
        _useState2 = _slicedToArray(_useState, 2),
        flags = _useState2[0],
        setFlags = _useState2[1];

  const _useState3 = (0, _react.useState)({}),
        _useState4 = _slicedToArray(_useState3, 2),
        timeouts = _useState4[0],
        setTimeouts = _useState4[1];

  (0, _react.useEffect)(() => {
    _events.default.on('flag.create', onFlagCreate);

    return () => {
      _events.default.off('flag.create', onFlagCreate);
    };
  }, [flags, timeouts]);
  (0, _react.useEffect)(() => {
    _events.default.on('flag.close', onFlagClose);

    return () => {
      _events.default.off('flag.close', onFlagClose);
    };
  }, [flags, timeouts]);
  (0, _react.useEffect)(() => {
    return () => {
      for (const id in timeouts) {
        clearTimeout(timeouts[id]);
      }
    };
  }, []);

  const onFlagCreate = flag => {
    setFlags(flags => [].concat(_toConsumableArray(flags), [flag]));

    if (flag.options.close === 'auto') {
      const timeout = setTimeout(() => closeFlag(flag.id), 4000);
      setTimeouts(timeouts => _objectSpread(_objectSpread({}, timeouts), {}, {
        [flag.id]: timeout
      }));
    }
  };

  const onFlagClose = id => {
    setFlags(flags => flags.filter(flag => flag.id !== id));

    if (timeouts[id]) {
      clearTimeout(timeouts[id]);
    }
  };

  const closeFlag = id => {
    _events.default.emit('flag.close', id);
  };

  return /*#__PURE__*/_react.default.createElement(_styled.FlagsContainer, {
    "data-testid": "ap-flags"
  }, flags.map(flag => /*#__PURE__*/_react.default.createElement(Flag, _extends({
    key: flag.id
  }, flag.options, {
    closeFlag: () => closeFlag(flag.id)
  }))));
};

var _default = Flags;
exports.default = _default;