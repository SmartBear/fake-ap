import Context from './modules/context'
import Cookie from './modules/cookie'
import Dialog from './modules/dialog'
import Events from './modules/events'
import Flag from './modules/flag'
import History from './modules/history'
import Host from './modules/host'
import Iframe from './modules/iframe'
import InlineDialog from './modules/inline-dialog'
import Jira from './modules/jira'
import Navigator from './modules/navigator'
import Request from './modules/request'
import User from './modules/user'
import RequestAdapter from './request-adapter'
import BackendRequestAdapter from './request-adapter/backend'

class AP {
  constructor(config = {}) {
    this._configure(config)

    const iframe = new Iframe(this)
    const request = new Request(this)

    this.events = new Events(this)

    this.context = new Context(this)
    this.cookie = new Cookie(this)
    this.dialog = new Dialog(this)
    this.flag = new Flag(this)
    this.history = new History(this)
    this.host = new Host(this)
    this.inlineDialog = new InlineDialog(this)
    this.jira = new Jira(this)
    this.navigator = new Navigator(this)
    this.request = (...args) => request.request(...args)
    this.resize = (...args) => iframe.resize(...args)
    this.sizeToParent = (...args) => iframe.sizeToParent(...args)
    this.user = new User(this)
  }

  _configure(config) {
    this._config = {}

    if (typeof config.notImplementedAction === 'function') {
      this._notImplemented = config.notImplementedAction
    } else {
      this._notImplemented = () => {}
    }

    if (typeof config.missingConfigurationAction === 'function') {
      this._missingConfiguration = config.missingConfigurationAction
    } else {
      this._missingConfiguration = (method, configuration) => {
        throw new Error(`Missing configuration for ${method}: ${configuration}`)
      }
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
      this._config.requestAdapter = new RequestAdapter((...args) => this._notImplemented('AP.request', ...args))
    }

    this._config.locale = config.locale
  }
}

export {
  RequestAdapter,
  BackendRequestAdapter
}

export default AP
