import '@testing-library/jest-dom'
import { act } from '@testing-library/react'
import { mountComponentWhenDocumentIsReady } from 'utils/mount-component'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

global.renderComponent = async (component, id) => {
  await act(async () => {
    mountComponentWhenDocumentIsReady(component, id)
  })

  return document.getElementById(id)
}

global.mockPostMessage = (target, source) => {
  const postMessage = target.postMessage

  target.postMessage = data => {
    target.dispatchEvent(new MessageEvent('message', { data, source }))
  }

  return () => {
    target.postMessage = postMessage
  }
}
