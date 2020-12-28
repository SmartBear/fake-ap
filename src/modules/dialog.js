import React from 'react'
import { events } from 'utils/events'
import { mountComponentWhenDocumentIsReady } from 'utils/mount-component'
import Logger from 'utils/logger'
import Dialogs from 'components/Dialogs'

class Dialog {
  constructor(dialogUrls) {
    this._dialogUrls = dialogUrls

    mountComponentWhenDocumentIsReady(<Dialogs />, 'ap_dialogs')
  }

  create = options => {
    options.url = this._dialogUrls[options.key]

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
    return Logger.notImplemented('AP.dialog.getButton', ...args)
  }

  disableCloseOnSubmit = (...args) => {
    return Logger.notImplemented('AP.dialog.disableCloseOnSubmit', ...args)
  }

  createButton = (...args) => {
    return Logger.notImplemented('AP.dialog.createButton', ...args)
  }

  isCloseOnEscape = (...args) => {
    return Logger.notImplemented('AP.dialog.isCloseOnEscape', ...args)
  }
}

export default Dialog
