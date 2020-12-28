import Signal from 'signals'
import Logger from 'utils/logger'

class History {
  _state = ''
  _stateSignal = new Signal()

  back = (...args) => {
    return Logger.notImplemented('AP.history.back', ...args)
  }

  forward = (...args) => {
    return Logger.notImplemented('AP.history.forward', ...args)
  }

  go = (...args) => {
    return Logger.notImplemented('AP.history.go', ...args)
  }

  getState = () => {
    return this._state
  }

  popState = callback => {
    this._stateSignal.add(callback)
  }

  pushState = state => {
    window.location.hash = `#!${state}`

    this._state = state
    this._stateSignal.dispatch(this._state)
  }

  replaceState = (...args) => {
    return Logger.notImplemented('AP.history.replaceState', ...args)
  }

  _clearHistory = () => {
    window.location.hash = ''

    this._state = ''
    this._stateSignal.removeAll()
  }
}

export default History
