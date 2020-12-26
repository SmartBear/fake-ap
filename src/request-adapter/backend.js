import axios from 'axios'
import { getReasonPhrase } from 'http-status-codes'
import RequestAdapter from '.'

class BackendRequestAdapter extends RequestAdapter {
  constructor(url) {
    super()

    this.url = url
    this.client = axios.create()
  }

  async request(options) {
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
