import { events } from 'utils/events'
import Logger from 'utils/logger'

class Events {
  on = events.on

  onPublic = (...args) => {
    return Logger.notImplemented('AP.events.onPublic', ...args)
  }

  once = events.once

  oncePublic = (...args) => {
    return Logger.notImplemented('AP.events.oncePublic', ...args)
  }

  onAny = (...args) => {
    return Logger.notImplemented('AP.events.onAny', ...args)
  }

  onAnyPublic = (...args) => {
    return Logger.notImplemented('AP.events.onAnyPublic', ...args)
  }

  off = events.off

  offPublic = (...args) => {
    return Logger.notImplemented('AP.events.offPublic', ...args)
  }

  offAll = (...args) => {
    return Logger.notImplemented('AP.events.offAll', ...args)
  }

  offAllPublic = (...args) => {
    return Logger.notImplemented('AP.events.offAllPublic', ...args)
  }

  offAny = (...args) => {
    return Logger.notImplemented('AP.events.offAny', ...args)
  }

  offAnyPublic = (...args) => {
    return Logger.notImplemented('AP.events.offAnyPublic', ...args)
  }

  emit = events.emit

  emitPublic = (...args) => {
    return Logger.notImplemented('AP.events.emitPublic', ...args)
  }
}

export default Events
