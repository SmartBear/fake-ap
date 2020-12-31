import RequestAdapter from 'request-adapter'

class Config {
  defaultConfig = {
    notImplementedAction: () => {},
    missingConfigurationAction: (method, configuration) => {
      throw new Error(`Missing configuration for ${method}: ${configuration}`)
    },
    requestAdapter: new RequestAdapter((...args) => this.notImplemented('AP.request', ...args)),
    clientKey: null,
    sharedSecret: null,
    userId: null,
    dialogUrls: {},
    locale: null
  }

  constructor() {
    this.setConfig(this.defaultConfig)
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

    this.clientKey = config.clientKey !== undefined ? config.clientKey : this.clientKey
    this.sharedSecret = config.sharedSecret !== undefined ? config.sharedSecret : this.sharedSecret
    this.userId = config.userId !== undefined ? config.userId : this.userId
    this.dialogUrls = config.dialogUrls !== undefined ? config.dialogUrls : this.dialogUrls
    this.locale = config.locale !== undefined ? config.locale : this.locale
  }
}

const config = new Config()

export default config
