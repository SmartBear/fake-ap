import config from 'config'

class Request {
  request = async (url, options = {}) => {
    const requestInformation = {
      method: options.type?.toUpperCase() || 'GET',
      path: url,
      data: options.data || {}
    }

    return await config.requestAdapter.request(requestInformation)
  }
}

const request = new Request()

export default request
