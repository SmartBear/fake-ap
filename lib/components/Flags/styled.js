"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionText = exports.ActionButton = exports.Actions = exports.Title = exports.Message = exports.CloseIconContainer = exports.TypeIconContainer = exports.FlagContainer = exports.FlagsContainer = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject9() {
  const data = _taggedTemplateLiteral(["\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"]);

  _templateObject9 = function () {
    return data;
  };

  return data;
}

function _templateObject8() {
  const data = _taggedTemplateLiteral(["\n  font-weight: 500;\n  background: none;\n  color: #0052CC;\n  border-width: 0;\n  cursor: pointer;\n  white-space: nowrap;\n  font-size: inherit;\n\n  &:hover {\n    background: none;\n    color: #0065FF;\n    text-decoration: underline;\n  }\n"]);

  _templateObject8 = function () {
    return data;
  };

  return data;
}

function _templateObject7() {
  const data = _taggedTemplateLiteral(["\n  padding-top: 10px;\n"]);

  _templateObject7 = function () {
    return data;
  };

  return data;
}

function _templateObject6() {
  const data = _taggedTemplateLiteral(["\n  font-weight: bold;\n  line-height: 20px;\n  margin: 0;\n"]);

  _templateObject6 = function () {
    return data;
  };

  return data;
}

function _templateObject5() {
  const data = _taggedTemplateLiteral(["\n  padding: 20px 40px 20px 60px;\n  box-shadow: 0 3px 6px rgba(0,0,0,0.2);\n  width: 300px;\n  border-radius: 3px;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    'Segoe UI',\n    Roboto,\n    Oxygen,\n    Ubuntu,\n    'Fira Sans',\n    'Droid Sans',\n    'Helvetica Neue',\n    sans-serif\n  ;\n  font-size: 14px;\n"]);

  _templateObject5 = function () {
    return data;
  };

  return data;
}

function _templateObject4() {
  const data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  color: #707070;\n  cursor: pointer;\n"]);

  _templateObject4 = function () {
    return data;
  };

  return data;
}

function _templateObject3() {
  const data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 20px;\n  left: 16px;\n  width: 24px;\n  height: 24px;\n  color: ", ";\n  fill: #FFFFFF;\n"]);

  _templateObject3 = function () {
    return data;
  };

  return data;
}

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n  position: relative;\n  margin-top: 10px;\n  background-color: #FFFFFF;\n  max-height: 300px;\n"]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  position: fixed;\n  top: 0;\n  right: 30px;\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const FlagsContainer = _styledComponents.default.div(_templateObject());

exports.FlagsContainer = FlagsContainer;

const FlagContainer = _styledComponents.default.div(_templateObject2());

exports.FlagContainer = FlagContainer;

const TypeIconContainer = _styledComponents.default.div(_templateObject3(), props => props.color);

exports.TypeIconContainer = TypeIconContainer;

const CloseIconContainer = _styledComponents.default.div(_templateObject4());

exports.CloseIconContainer = CloseIconContainer;

const Message = _styledComponents.default.div(_templateObject5());

exports.Message = Message;

const Title = _styledComponents.default.p(_templateObject6());

exports.Title = Title;

const Actions = _styledComponents.default.div(_templateObject7());

exports.Actions = Actions;

const ActionButton = _styledComponents.default.button(_templateObject8());

exports.ActionButton = ActionButton;

const ActionText = _styledComponents.default.div(_templateObject9());

exports.ActionText = ActionText;