import Logger from 'utils/logger'

class Iframe {
  resize = (...args) => {
    return Logger.notImplemented('AP.resize', ...args)
  }

  sizeToParent = (...args) => {
    return Logger.notImplemented('AP.sizeToParent', ...args)
  }
}

export default Iframe
