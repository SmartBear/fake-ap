import BackendRequestAdapter from 'request-adapter/backend'

const url = '/path'
const backendRequestAdapter = new BackendRequestAdapter(url)

describe('BackendRequestAdapter', () => {
  describe('request', () => {
    it('makes a post request using the provided URL and options', () => {
      backendRequestAdapter.client = {
        post: jest.fn().mockReturnValue({ data: {} })
      }

      const options = {
        method: 'GET'
      }

      backendRequestAdapter.request(options)

      expect(backendRequestAdapter.client.post).toHaveBeenCalledWith(url, options)
    })
  })
})
