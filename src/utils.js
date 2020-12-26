import Signal from 'signals'
import ReactDOM from 'react-dom'

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

const mountComponentWhenDocumentIsReady = (component, id) => {
  onDocumentReady(() => mountComponent(component, id))
}

const onDocumentReady = callback => {
  if (document.readyState !== 'loading') {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', callback)
  }
}

const mountComponent = (component, id) => {
  let container = document.getElementById(id)

  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', id)

    document.body.appendChild(container)
  }

  ReactDOM.render(component, container)
}

export {
  events,
  mountComponentWhenDocumentIsReady
}
