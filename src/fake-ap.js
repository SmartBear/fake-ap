import React from 'react'
import config from 'config'
import context from 'modules/context'
import cookie from 'modules/cookie'
import dialog from 'modules/dialog'
import events from 'modules/events'
import flag from 'modules/flag'
import history from 'modules/history'
import host from 'modules/host'
import iframe from 'modules/iframe'
import inlineDialog from 'modules/inline-dialog'
import jira from 'modules/jira'
import navigator from 'modules/navigator'
import request from 'modules/request'
import user from 'modules/user'
import Dialogs from 'components/Dialogs'
import Flags from 'components/Flags'
import { mountComponentWhenDocumentIsReady } from 'utils/mount-component'

class AP {
  context = context
  cookie = cookie
  dialog = dialog
  events = events
  flag = flag
  history = history
  host = host
  inlineDialog = inlineDialog
  jira = jira
  navigator = navigator
  request = request.request
  resize = iframe.resize
  sizeToParent = iframe.sizeToParent
  user = user

  constructor(options = {}) {
    this.configure(options)

    if (config.mountDialogs) {
      mountComponentWhenDocumentIsReady(<Dialogs />, 'ap_dialogs')
    }

    if (config.mountFlags) {
      mountComponentWhenDocumentIsReady(<Flags />, 'ap_flags')
    }
  }

  configure(options) {
    config.setConfig(options)
  }
}

export default AP
