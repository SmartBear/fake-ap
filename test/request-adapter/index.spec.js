import RequestAdapter from 'request-adapter'

const notImplemented = jest.fn()
const requestAdapter = new RequestAdapter(notImplemented)

describe('RequestAdapter', () => {
  describe('request', () => {
    beforeEach(() => {
      notImplemented.mockClear()
    })

    it('logs the method call with its arguments', async () => {
      const options = {
        method: 'GET'
      }

      await requestAdapter.request(options)

      expect(notImplemented).toHaveBeenCalledWith(options)
    })

    it('returns a response with empty data', async () => {
      const response = await requestAdapter.request()

      expect(response).toEqual({
        body: JSON.stringify({})
      })
    })
  })
})
