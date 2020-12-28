import Signal from 'signals'

const eventNames = {}

const events = {
  on: (name, listener) => {
    if (eventNames[name] === undefined) {
      eventNames[name] = new Signal()
    }
    eventNames[name].add(listener)
  },

  once: (name, listener) => {
    if (eventNames[name] === undefined) {
      eventNames[name] = new Signal()
    }
    eventNames[name].addOnce(listener)
  },

  off: (name, listener) => {
    if (eventNames[name] !== undefined) {
      eventNames[name].remove(listener)
    }
  },

  emit: (name, args) => {
    if (eventNames[name] !== undefined) {
      eventNames[name].dispatch(args)
    }
  }
}

export {
  events
}
