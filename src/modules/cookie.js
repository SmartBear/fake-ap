import Logger from 'utils/logger'

class Cookie {
  save = (...args) => {
    return Logger.notImplemented('AP.cookie.save', ...args)
  }

  read = (...args) => {
    return Logger.notImplemented('AP.cookie.read', ...args)
  }

  erase = (...args) => {
    return Logger.notImplemented('AP.cookie.erase', ...args)
  }
}

export default Cookie
