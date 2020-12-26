class Iframe {
  constructor(ap) {
    this._ap = ap
  }

  resize = (...args) => {
    return this._ap._notImplemented('AP.resize', ...args)
  }

  sizeToParent = (...args) => {
    return this._ap._notImplemented('AP.sizeToParent', ...args)
  }
}

export default Iframe
