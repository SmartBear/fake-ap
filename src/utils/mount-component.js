import ReactDOM from 'react-dom/client'

const roots = {}

const mountComponentWhenDocumentIsReady = (component, id) => {
  onDocumentReady(() => mountComponent(component, id))
}

const unmountComponent = id => {
  roots[id]?.unmount()
}

const onDocumentReady = callback => {
  if (document.readyState !== 'loading') {
    callback()
  } else {
    document.addEventListener('DOMContentLoaded', callback)
  }
}

const mountComponent = (component, id) => {
  if (roots[id]) {
    roots[id].unmount()
    roots[id] = null
  }

  let container = document.getElementById(id)

  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', id)

    document.body.appendChild(container)
  }

  const root = ReactDOM.createRoot(container)
  roots[id] = root

  root.render(component)
}

export {
  mountComponentWhenDocumentIsReady,
  unmountComponent
}
