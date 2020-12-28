import ReactDOM from 'react-dom'

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
  mountComponentWhenDocumentIsReady
}
