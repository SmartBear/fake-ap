import Signal from 'signals'

class History {
  _state = ''
  _stateSignal = new Signal()

  constructor(ap) {
    this._ap = ap
  }

  back = (...args) => {
    return this._ap._notImplemented('AP.history.back', ...args)
  }

  forward = (...args) => {
    return this._ap._notImplemented('AP.history.forward', ...args)
  }

  go = (...args) => {
    return this._ap._notImplemented('AP.history.go', ...args)
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
    return this._ap._notImplemented('AP.history.replaceState', ...args)
  }

  _clearHistory = () => {
    window.location.hash = ''

    this._state = ''
    this._stateSignal.removeAll()
  }
}

export default History
