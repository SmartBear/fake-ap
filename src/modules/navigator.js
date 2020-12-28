import Logger from 'utils/logger'

class Navigator {
  getLocation = (...args) => {
    return Logger.notImplemented('AP.navigator.getLocation', ...args)
  }

  go = (...args) => {
    return Logger.notImplemented('AP.navigator.go', ...args)
  }

  reload = (...args) => {
    return Logger.notImplemented('AP.navigator.reload', ...args)
  }
}

export default Navigator
