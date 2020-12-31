import config from 'config'

class Iframe {
  resize = (...args) => {
    return config.notImplemented('AP.resize', ...args)
  }

  sizeToParent = (...args) => {
    return config.notImplemented('AP.sizeToParent', ...args)
  }
}

const iframe = new Iframe()

export default iframe
