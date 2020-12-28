import Logger from 'utils/logger'

class User {
  constructor(locale) {
    this._locale = locale
  }

  getCurrentUser = (...args) => {
    return Logger.notImplemented('AP.user.getCurrentUser', ...args)
  }

  getTimeZone = (...args) => {
    return Logger.notImplemented('AP.user.getTimeZone', ...args)
  }

  getLocale = callback => {
    callback(this._locale || 'en_US')
  }
}

export default User
