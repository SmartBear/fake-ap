import ReactDOM from 'react-dom/client'

const roots = {}

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
  if (roots[id]) {
    unmountComponent(id)
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

const unmountComponent = id => {
  roots[id]?.unmount()
  roots[id] = null
}

export {
  mountComponentWhenDocumentIsReady,
  unmountComponent
}
