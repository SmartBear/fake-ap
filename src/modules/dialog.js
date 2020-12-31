import React from 'react'
import events from 'modules/events'
import { mountComponentWhenDocumentIsReady } from 'utils/mount-component'
import config from 'config'
import Dialogs from 'components/Dialogs'

class Dialog {
  constructor() {
    mountComponentWhenDocumentIsReady(<Dialogs />, 'ap_dialogs')
  }

  create = options => {
    options.url = config.dialogUrls[options.key]

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
    return config.notImplemented('AP.dialog.getButton', ...args)
  }

  disableCloseOnSubmit = (...args) => {
    return config.notImplemented('AP.dialog.disableCloseOnSubmit', ...args)
  }

  createButton = (...args) => {
    return config.notImplemented('AP.dialog.createButton', ...args)
  }

  isCloseOnEscape = (...args) => {
    return config.notImplemented('AP.dialog.isCloseOnEscape', ...args)
  }
}

const dialog = new Dialog()

export default dialog
