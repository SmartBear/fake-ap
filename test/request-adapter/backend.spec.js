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
      describe('when the response body is an object', () => {
        it('returns an object containing the response body as a string', async () => {
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

          const response = await backendRequestAdapter.request()

          expect(response).toEqual({ body: JSON.stringify({ message: 'value' }) })
        })
      })

      describe('when the response body is string', () => {
        it('returns an object containing the response body as a string', async () => {
          backendRequestAdapter.client.post.mockReturnValueOnce(
            {
              data: {
                status: 200,
                body: 'message'
              }
            }
          )

          const response = await backendRequestAdapter.request()

          expect(response).toEqual({ body: 'message' })
        })
      })
    })

    describe('when the response status is an error', () => {
      describe('when the response body is an object', () => {
        it('rejects with an object containing the response body as a string and the status', async () => {
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

      describe('when the response body is string', () => {
        it('rejects with an object containing the response body and status', async () => {
          backendRequestAdapter.client.post.mockReturnValueOnce(
            {
              data: {
                status: 400,
                body: 'message'
              }
            }
          )

          const request = backendRequestAdapter.request()

          await expect(request).rejects.toEqual({
            err: 'message',
            xhr: {
              responseText: 'message',
              status: 400,
              statusText: 'Bad Request'
            }
          })
        })
      })
    })
  })
})
