import RequestAdapter from 'request-adapter'

class Config {
  constructor() {
    this.resetConfig()
  }

  setConfig = config => {
    if (typeof config.notImplementedAction === 'function') {
      this.notImplemented = config.notImplementedAction
    }

    if (typeof config.missingConfigurationAction === 'function') {
      this.missingConfiguration = config.missingConfigurationAction
    }

    if (config.requestAdapter instanceof RequestAdapter) {
      this.requestAdapter = config.requestAdapter
    }

    if (typeof config.getContextAction === 'function') {
      this.getContextAction = config.getContextAction
    }

    this.clientKey = config.clientKey ?? this.clientKey
    this.sharedSecret = config.sharedSecret ?? this.sharedSecret
    this.userId = config.userId ?? this.userId
    this.dialogUrls = config.dialogUrls ?? this.dialogUrls
    this.locale = config.locale ?? this.locale
    this.mountDialogs = config.mountDialogs ?? this.mountDialogs
    this.mountFlags = config.mountFlags ?? this.mountFlags
  }

  resetConfig = () => {
    this.notImplemented = () => {}
    this.missingConfiguration = (method, configuration) => {
      throw new Error(`Missing configuration for ${method}: ${configuration}`)
    }
    this.getContextAction = () => {}

    this.requestAdapter = new RequestAdapter((...args) =>
      this.notImplemented('AP.request', ...args)
    )

    this.clientKey = null
    this.sharedSecret = null
    this.userId = null
    this.dialogUrls = {}
    this.locale = null
    this.mountDialogs = true
    this.mountFlags = true
  }
}

const config = new Config()

export default config
