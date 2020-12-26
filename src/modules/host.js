class Host {
  constructor(ap) {
    this._ap = ap
  }

  getSelectedText = (...args) => {
    return this._ap._notImplemented('AP.host.getSelectedText', ...args)
  }
}

export default Host
