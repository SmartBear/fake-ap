class User {
  constructor(ap) {
    this._ap = ap
  }

  getCurrentUser = (...args) => {
    return this._ap._notImplemented('AP.user.getCurrentUser', ...args)
  }

  getTimeZone = (...args) => {
    return this._ap._notImplemented('AP.user.getTimeZone', ...args)
  }

  getLocale = callback => {
    callback(this._ap._config.locale || 'en_US')
  }
}

export default User
