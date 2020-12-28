import Context from 'modules/context'
import Cookie from 'modules/cookie'
import Dialog from 'modules/dialog'
import Events from 'modules/events'
import Flag from 'modules/flag'
import History from 'modules/history'
import Host from 'modules/host'
import Iframe from 'modules/iframe'
import InlineDialog from 'modules/inline-dialog'
import Jira from 'modules/jira'
import Navigator from 'modules/navigator'
import Request from 'modules/request'
import User from 'modules/user'
import RequestAdapter from 'request-adapter'
import Logger from 'utils/logger'

class AP {
  constructor(config = {}) {
    this._configure(config)

    const iframe = new Iframe()
    const request = new Request(this._config.requestAdapter)

    this.context = new Context(this._config.tenant.clientKey, this._config.tenant.sharedSecret, this._config.user.id)
    this.cookie = new Cookie()
    this.dialog = new Dialog(this._config.dialogUrls)
    this.events = new Events()
    this.flag = new Flag()
    this.history = new History()
    this.host = new Host()
    this.inlineDialog = new InlineDialog()
    this.jira = new Jira()
    this.navigator = new Navigator()
    this.request = (...args) => request.request(...args)
    this.resize = (...args) => iframe.resize(...args)
    this.sizeToParent = (...args) => iframe.sizeToParent(...args)
    this.user = new User(this._config.locale)
  }

  _configure(config) {
    this._config = {}

    if (typeof config.notImplementedAction === 'function') {
      Logger.notImplemented = config.notImplementedAction
    }

    if (typeof config.missingConfigurationAction === 'function') {
      Logger.missingConfiguration = config.missingConfigurationAction
    }

    this._config.tenant = {
      clientKey: config.clientKey || '',
      sharedSecret: config.sharedSecret || ''
    }

    this._config.user = {
      id: config.userId || ''
    }

    this._config.dialogUrls = config.dialogUrls || {}

    if (config.requestAdapter instanceof RequestAdapter) {
      this._config.requestAdapter = config.requestAdapter
    } else {
      this._config.requestAdapter = new RequestAdapter((...args) => Logger.notImplemented('AP.request', ...args))
    }

    this._config.locale = config.locale
  }
}

export default AP
