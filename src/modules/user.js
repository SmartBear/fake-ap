import config from 'config'

class User {
  getCurrentUser = (...args) => {
    return config.notImplemented('AP.user.getCurrentUser', ...args)
  }

  getTimeZone = (...args) => {
    return config.notImplemented('AP.user.getTimeZone', ...args)
  }

  getLocale = callback => {
    callback(config.locale || 'en_US')
  }
}

const user = new User()

export default user
