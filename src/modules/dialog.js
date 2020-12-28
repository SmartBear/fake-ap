import React from 'react'
import { events } from 'utils/events'
import { mountComponentWhenDocumentIsReady } from 'utils/mount-component'
import Dialogs from 'components/Dialogs'

class Dialog {
  constructor(ap) {
    this._ap = ap

    mountComponentWhenDocumentIsReady(<Dialogs />, 'ap_dialogs')
  }

  create = options => {
    options.url = this._ap._config.dialogUrls[options.key]

    events.emit('dialog.create', options)
  }

  close = data => {
    window.top.postMessage({ type: 'AP.dialog.close', data })
  }

  getCustomData = callback => {
    window.addEventListener('message', event => {
      if (event.source !== window.top) {
        return
      }

      if (typeof event.data !== 'object' && event.data.type !== 'AP.dialog.customData') {
        return
      }

      callback(event.data.customData)
    })

    window.top.postMessage({ type: 'AP.dialog.getCustomData' })
  }

  getButton = (...args) => {
    return this._ap._notImplemented('AP.dialog.getButton', ...args)
  }

  disableCloseOnSubmit = (...args) => {
    return this._ap._notImplemented('AP.dialog.disableCloseOnSubmit', ...args)
  }

  createButton = (...args) => {
    return this._ap._notImplemented('AP.dialog.createButton', ...args)
  }

  isCloseOnEscape = (...args) => {
    return this._ap._notImplemented('AP.dialog.isCloseOnEscape', ...args)
  }
}

export default Dialog
