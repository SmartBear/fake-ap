import '@testing-library/jest-dom'
import util from 'util'
import { act } from '@testing-library/react'
import { mountComponentWhenDocumentIsReady } from 'utils/mount-component'

globalThis.IS_REACT_ACT_ENVIRONMENT = true

const ignoredMessages = [
  /^Warning: You are importing createRoot/
]

const failureMessages = [
  /^Warning: Can't perform a React state update on an unmounted component/,
  /^Warning: An update to/,
  /^Warning: Failed %s type/
]

const consoleWarn = console.warn
const consoleError = console.error

console.warn = (message, ...args) => {
  if (failureMessages.some(failureMessage => failureMessage.test(message))) {
    throw new Error(util.format(message, ...args))
  }

  if (!ignoredMessages.some(ignoredMessage => ignoredMessage.test(message))) {
    consoleWarn(message, ...args)
  }
}

console.error = (message, ...args) => {
  if (failureMessages.some(failureMessage => failureMessage.test(message))) {
    throw new Error(util.format(message, ...args))
  }

  if (!ignoredMessages.some(ignoredMessage => ignoredMessage.test(message))) {
    consoleError(message, ...args)
  }
}

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
