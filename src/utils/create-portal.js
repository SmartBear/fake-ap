import ReactDOM from 'react-dom'

const findOrCreateElement = id => {
  let element = document.getElementById(id)

  if (!element) {
    element = document.createElement('div')
    element.setAttribute('id', id)

    document.body.appendChild(element)
  }
}

const createPortal = (component, id) => ReactDOM.createPortal(component, findOrCreateElement(id))

export default createPortal
