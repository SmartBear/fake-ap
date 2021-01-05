import axios from 'axios'
import { getReasonPhrase } from 'http-status-codes'
import RequestAdapter from 'request-adapter'

class BackendRequestAdapter extends RequestAdapter {
  client = axios.create()

  constructor(url) {
    super()

    this.url = url
  }

  request = async options => {
    const response = await this.client.post(this.url, options)

    const { status, body } = response.data

    const responseBody = typeof body === 'string' ? body : JSON.stringify(body)

    if (status < 200 || status >= 300) {
      const error = {
        err: responseBody,
        xhr: {
          responseText: responseBody,
          status,
          statusText: getReasonPhrase(status)
        }
      }

      throw error
    }

    return {
      body: responseBody
    }
  }
}

export default BackendRequestAdapter
