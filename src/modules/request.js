class Request {
  constructor(ap) {
    this._ap = ap
  }

  request = async (url, options = {}) => {
    const requestInformation = {
      method: options.type?.toUpperCase() || 'GET',
      path: url,
      data: options.data || {}
    }

    return await this._ap._config.requestAdapter.request(requestInformation)
  }
}

export default Request
