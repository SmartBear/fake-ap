import config from 'config'

class Navigator {
  getLocation = (...args) => {
    return config.notImplemented('AP.navigator.getLocation', ...args)
  }

  go = (...args) => {
    return config.notImplemented('AP.navigator.go', ...args)
  }

  reload = (...args) => {
    return config.notImplemented('AP.navigator.reload', ...args)
  }
}

const navigator = new Navigator()

export default navigator
