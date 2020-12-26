class Navigator {
  constructor(ap) {
    this._ap = ap
  }

  getLocation = (...args) => {
    return this._ap._notImplemented('AP.navigator.getLocation', ...args)
  }

  go = (...args) => {
    return this._ap._notImplemented('AP.navigator.go', ...args)
  }

  reload = (...args) => {
    return this._ap._notImplemented('AP.navigator.reload', ...args)
  }
}

export default Navigator
