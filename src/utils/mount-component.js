import ReactDOM from 'react-dom'

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

  const root = createRoot(container)
  roots[id] = root

  root.render(component)
}

const createRoot = typeof ReactDOM.createRoot === 'function' ? ReactDOM.createRoot : container => ({
  render: component => ReactDOM.render(component, container),
  unmount: () => ReactDOM.unmountComponentAtNode(container)
})

const unmountComponent = id => {
  roots[id]?.unmount()
  roots[id] = null
}

export {
  mountComponentWhenDocumentIsReady,
  unmountComponent
}
