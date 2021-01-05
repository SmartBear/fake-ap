import BackendRequestAdapter from 'request-adapter/backend'

const url = '/path'
const backendRequestAdapter = new BackendRequestAdapter(url)

backendRequestAdapter.client = {
  post: jest.fn().mockReturnValue({ data: {} })
}

describe('BackendRequestAdapter', () => {
  describe('request', () => {
    it('makes a post request using the provided URL and options', async () => {
      const options = {
        method: 'GET'
      }

      await backendRequestAdapter.request(options)

      expect(backendRequestAdapter.client.post).toHaveBeenCalledWith(url, options)
    })

    describe('when the response status is not an error', () => {
      beforeEach(() => {
        backendRequestAdapter.client.post.mockReturnValueOnce(
          {
            data: {
              status: 200,
              body: {
                message: 'value'
              }
            }
          }
        )
      })

      it('returns an object containing the response body as a string', async () => {
        const response = await backendRequestAdapter.request()

        expect(response).toEqual({ body: JSON.stringify({ message: 'value' }) })
      })
    })

    describe('when the response status is an error', () => {
      beforeEach(() => {
        backendRequestAdapter.client.post.mockReturnValueOnce(
          {
            data: {
              status: 400,
              body: {
                message: 'value'
              }
            }
          }
        )
      })

      it('rejects with an object containing the response body as a string and the status of the response', async () => {
        const request = backendRequestAdapter.request()

        await expect(request).rejects.toEqual({
          err: JSON.stringify({ message: 'value' }),
          xhr: {
            responseText: JSON.stringify({ message: 'value' }),
            status: 400,
            statusText: 'Bad Request'
          }
        })
      })
    })
  })
})
