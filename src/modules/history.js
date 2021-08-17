import Signal from 'signals'
import config from 'config'

class History {
  _state
  _stateSignal = new Signal()

  back = (...args) => {
    return config.notImplemented('AP.history.back', ...args)
  }

  forward = (...args) => {
    return config.notImplemented('AP.history.forward', ...args)
  }

  go = (...args) => {
    return config.notImplemented('AP.history.go', ...args)
  }

  getState = () => {
    return this._state ?? config.initialState
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
    return config.notImplemented('AP.history.replaceState', ...args)
  }

  _clearHistory = () => {
    window.location.hash = ''

    this._state = ''
    this._stateSignal.removeAll()
  }
}

const history = new History()

export default history
