class InlineDialog {
  constructor(ap) {
    this._ap = ap
  }

  hide = (...args) => {
    return this._ap._notImplemented('AP.inlineDialog.hide', ...args)
  }
}

export default InlineDialog
