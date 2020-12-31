import Signal from 'signals'
import config from 'config'

class Events {
  _eventNames = {}

  on = (name, listener) => {
    if (this._eventNames[name] === undefined) {
      this._eventNames[name] = new Signal()
    }
    this._eventNames[name].add(listener)
  }

  onPublic = (...args) => {
    return config.notImplemented('AP.events.onPublic', ...args)
  }

  once = (name, listener) => {
    if (this._eventNames[name] === undefined) {
      this._eventNames[name] = new Signal()
    }
    this._eventNames[name].addOnce(listener)
  }

  oncePublic = (...args) => {
    return config.notImplemented('AP.events.oncePublic', ...args)
  }

  onAny = (...args) => {
    return config.notImplemented('AP.events.onAny', ...args)
  }

  onAnyPublic = (...args) => {
    return config.notImplemented('AP.events.onAnyPublic', ...args)
  }

  off = (name, listener) => {
    if (this._eventNames[name] !== undefined) {
      this._eventNames[name].remove(listener)
    }
  }

  offPublic = (...args) => {
    return config.notImplemented('AP.events.offPublic', ...args)
  }

  offAll = (...args) => {
    return config.notImplemented('AP.events.offAll', ...args)
  }

  offAllPublic = (...args) => {
    return config.notImplemented('AP.events.offAllPublic', ...args)
  }

  offAny = (...args) => {
    return config.notImplemented('AP.events.offAny', ...args)
  }

  offAnyPublic = (...args) => {
    return config.notImplemented('AP.events.offAnyPublic', ...args)
  }

  emit = (name, args) => {
    if (this._eventNames[name] !== undefined) {
      this._eventNames[name].dispatch(args)
    }
  }

  emitPublic = (...args) => {
    return config.notImplemented('AP.events.emitPublic', ...args)
  }
}

const events = new Events()

export default events
