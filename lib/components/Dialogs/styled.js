"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogsContainer = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  position: fixed;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 3000;\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const DialogsContainer = _styledComponents.default.div(_templateObject());

exports.DialogsContainer = DialogsContainer;