"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Jira {
  constructor() {
    _defineProperty(this, "refreshIssuePage", function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.jira.refreshIssuePage'].concat(args));
    });

    _defineProperty(this, "getWorkflowConfiguration", function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.jira.getWorkflowConfiguration'].concat(args));
    });

    _defineProperty(this, "isDashboardItemEditable", function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.jira.isDashboardItemEditable'].concat(args));
    });

    _defineProperty(this, "openCreateIssueDialog", function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.jira.openCreateIssueDialog'].concat(args));
    });

    _defineProperty(this, "setDashboardItemTitle", function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.jira.setDashboardItemTitle'].concat(args));
    });

    _defineProperty(this, "openDatePicker", function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.jira.openDatePicker'].concat(args));
    });

    _defineProperty(this, "initJQLEditor", function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.jira.initJQLEditor'].concat(args));
    });

    _defineProperty(this, "showJQLEditor", function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.jira.showJQLEditor'].concat(args));
    });

    _defineProperty(this, "isNativeApp", function () {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      return _config.default.notImplemented.apply(_config.default, ['AP.jira.isNativeApp'].concat(args));
    });
  }

}

const jira = new Jira();
var _default = jira;
exports.default = _default;