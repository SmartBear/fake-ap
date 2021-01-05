"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloseIcon = exports.ErrorIcon = exports.WarningIcon = exports.SuccessIcon = exports.InfoIcon = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const InfoIcon = () => /*#__PURE__*/_react.default.createElement("svg", {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  focusable: "false",
  role: "presentation"
}, /*#__PURE__*/_react.default.createElement("g", {
  fillRule: "evenodd"
}, /*#__PURE__*/_react.default.createElement("path", {
  d: "M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12z",
  fill: "currentColor"
}), /*#__PURE__*/_react.default.createElement("rect", {
  fill: "inherit",
  x: "11",
  y: "10",
  width: "2",
  height: "7",
  rx: "1"
}), /*#__PURE__*/_react.default.createElement("circle", {
  fill: "inherit",
  cx: "12",
  cy: "8",
  r: "1"
})));

exports.InfoIcon = InfoIcon;

const SuccessIcon = () => /*#__PURE__*/_react.default.createElement("svg", {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  focusable: "false",
  role: "presentation"
}, /*#__PURE__*/_react.default.createElement("g", {
  fillRule: "evenodd"
}, /*#__PURE__*/_react.default.createElement("circle", {
  fill: "currentColor",
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M9.707 11.293a1 1 0 1 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 1 0-1.414-1.414L11 12.586l-1.293-1.293z",
  fill: "inherit"
})));

exports.SuccessIcon = SuccessIcon;

const WarningIcon = () => /*#__PURE__*/_react.default.createElement("svg", {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  focusable: "false",
  role: "presentation"
}, /*#__PURE__*/_react.default.createElement("g", {
  fillRule: "evenodd"
}, /*#__PURE__*/_react.default.createElement("path", {
  d: "M12.938 4.967c-.518-.978-1.36-.974-1.876 0L3.938 18.425c-.518.978-.045 1.771 1.057 1.771h14.01c1.102 0 1.573-.797 1.057-1.771L12.938 4.967z",
  fill: "currentColor"
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M12 15a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1m0 3a1 1 0 0 1 0-2 1 1 0 0 1 0 2",
  fill: "inherit"
})));

exports.WarningIcon = WarningIcon;

const ErrorIcon = () => /*#__PURE__*/_react.default.createElement("svg", {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  focusable: "false",
  role: "presentation"
}, /*#__PURE__*/_react.default.createElement("g", {
  fillRule: "evenodd"
}, /*#__PURE__*/_react.default.createElement("path", {
  d: "M13.416 4.417a2.002 2.002 0 0 0-2.832 0l-6.168 6.167a2.002 2.002 0 0 0 0 2.833l6.168 6.167a2.002 2.002 0 0 0 2.832 0l6.168-6.167a2.002 2.002 0 0 0 0-2.833l-6.168-6.167z",
  fill: "currentColor"
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M12 14a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1m0 3a1 1 0 0 1 0-2 1 1 0 0 1 0 2",
  fill: "inherit"
})));

exports.ErrorIcon = ErrorIcon;

const CloseIcon = () => /*#__PURE__*/_react.default.createElement("svg", {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  focusable: "false",
  role: "presentation",
  style: {
    width: '22px',
    height: '22px'
  }
}, /*#__PURE__*/_react.default.createElement("path", {
  d: "M12 10.586L6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 1 0-1.414-1.414L12 10.586z",
  fill: "currentColor"
}));

exports.CloseIcon = CloseIcon;