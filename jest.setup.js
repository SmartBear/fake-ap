import '@testing-library/jest-dom'
import util from 'util'

const failureMessages = [
  /^Warning: Can't perform a React state update on an unmounted component/,
  /^Warning: An update to/,
  /^Warning: Failed %s type/
]

console.warn = (message, ...args) => {
  if (failureMessages.some(failureMessage => failureMessage.test(message))) {
    throw new Error(util.format(message, ...args))
  }
}

console.error = (message, ...args) => {
  if (failureMessages.some(failureMessage => failureMessage.test(message))) {
    throw new Error(util.format(message, ...args))
  }
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
