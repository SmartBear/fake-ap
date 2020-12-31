import config from 'config'

class Cookie {
  save = (...args) => {
    return config.notImplemented('AP.cookie.save', ...args)
  }

  read = (...args) => {
    return config.notImplemented('AP.cookie.read', ...args)
  }

  erase = (...args) => {
    return config.notImplemented('AP.cookie.erase', ...args)
  }
}

const cookie = new Cookie()

export default cookie
