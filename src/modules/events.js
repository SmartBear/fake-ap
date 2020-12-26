import { events } from '../utils'

class Events {
  constructor(ap) {
    this._ap = ap
  }

  on = events.on

  onPublic = (...args) => {
    return this._ap._notImplemented('AP.events.onPublic', ...args)
  }

  once = events.once

  oncePublic = (...args) => {
    return this._ap._notImplemented('AP.events.oncePublic', ...args)
  }

  onAny = (...args) => {
    return this._ap._notImplemented('AP.events.onAny', ...args)
  }

  onAnyPublic = (...args) => {
    return this._ap._notImplemented('AP.events.onAnyPublic', ...args)
  }

  off = events.off

  offPublic = (...args) => {
    return this._ap._notImplemented('AP.events.offPublic', ...args)
  }

  offAll = (...args) => {
    return this._ap._notImplemented('AP.events.offAll', ...args)
  }

  offAllPublic = (...args) => {
    return this._ap._notImplemented('AP.events.offAllPublic', ...args)
  }

  offAny = (...args) => {
    return this._ap._notImplemented('AP.events.offAny', ...args)
  }

  offAnyPublic = (...args) => {
    return this._ap._notImplemented('AP.events.offAnyPublic', ...args)
  }

  emit = events.emit

  emitPublic = (...args) => {
    return this._ap._notImplemented('AP.events.emitPublic', ...args)
  }
}

export default Events
