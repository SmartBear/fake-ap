class Request {
  constructor(requestAdapter) {
    this._requestAdapter = requestAdapter
  }

  request = async (url, options = {}) => {
    const requestInformation = {
      method: options.type?.toUpperCase() || 'GET',
      path: url,
      data: options.data || {}
    }

    return await this._requestAdapter.request(requestInformation)
  }
}

export default Request
