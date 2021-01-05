"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountComponentWhenDocumentIsReady = void 0;

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mountComponentWhenDocumentIsReady = (component, id) => {
  onDocumentReady(() => mountComponent(component, id));
};

exports.mountComponentWhenDocumentIsReady = mountComponentWhenDocumentIsReady;

const onDocumentReady = callback => {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
};

const mountComponent = (component, id) => {
  let container = document.getElementById(id);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', id);
    document.body.appendChild(container);
  }

  _reactDom.default.render(component, container);
};