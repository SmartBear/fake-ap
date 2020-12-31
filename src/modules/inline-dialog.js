import config from 'config'

class InlineDialog {
  hide = (...args) => {
    return config.notImplemented('AP.inlineDialog.hide', ...args)
  }
}

const inlineDialog = new InlineDialog()

export default inlineDialog
