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

const createRoot = id => {
  let container = document.getElementById(id)

  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', id)

    document.body.appendChild(container)
  }

  const root = ReactDOM.createRoot(container)
  roots[id] = root

  return root
}

const mountComponent = (component, id) => {
  const root = roots[id] || createRoot(id)

  root.render(component)

  return root
}

export {
  mountComponentWhenDocumentIsReady
}
