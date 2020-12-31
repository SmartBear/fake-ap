import config from 'config'

class Host {
  getSelectedText = (...args) => {
    return config.notImplemented('AP.host.getSelectedText', ...args)
  }
}

const host = new Host()

export default host
