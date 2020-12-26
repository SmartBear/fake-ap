class RequestAdapter {
  constructor(notImplemented = () => {}) {
    this.notImplemented = notImplemented
  }

  async request(...args) {
    this.notImplemented(...args)

    return {
      body: JSON.stringify({})
    }
  }
}

export default RequestAdapter
