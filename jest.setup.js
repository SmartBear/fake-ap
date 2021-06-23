import '@testing-library/jest-dom'

global.mockPostMessage = (target, source) => {
  const postMessage = target.postMessage

  target.postMessage = data => {
    target.dispatchEvent(new MessageEvent('message', { data, source }))
  }

  return () => {
    target.postMessage = postMessage
  }
}
