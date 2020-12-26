class Cookie {
  constructor(ap) {
    this._ap = ap
  }

  save = (...args) => {
    return this._ap._notImplemented('AP.cookie.save', ...args)
  }

  read = (...args) => {
    return this._ap._notImplemented('AP.cookie.read', ...args)
  }

  erase = (...args) => {
    return this._ap._notImplemented('AP.cookie.erase', ...args)
  }
}

export default Cookie
