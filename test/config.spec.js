import config from 'config'
import RequestAdapter from 'request-adapter'

describe('default configuration', () => {
  it('sets the missing configuration action to throw an error', async () => {
    expect(() => config.missingConfiguration('method', 'option')).toThrow('Missing configuration for method: option')
  })

  it('sets a default request adapter that does nothing', async () => {
    expect(config.requestAdapter).toBeInstanceOf(RequestAdapter)
  })

  it('sets the client key to null', async () => {
    expect(config.clientKey).toBeNull()
  })

  it('sets the shared secret to null', async () => {
    expect(config.sharedSecret).toBeNull()
  })

  it('sets the user ID to null', async () => {
    expect(config.userId).toBeNull()
  })

  it('sets the dialog URLs to an empty object', async () => {
    expect(config.dialogUrls).toEqual({})
  })

  it('sets the locale to null', async () => {
    expect(config.locale).toBeNull()
  })
})

describe('reset configuration', () => {
  const notImplementedAction = jest.fn()
  const missingConfigurationAction = jest.fn()

  beforeEach(() => {
    config.setConfig({
      notImplementedAction,
      missingConfigurationAction,
      requestAdapter: new RequestAdapter(notImplementedAction),
      clientKey: 'key',
      sharedSecret: 'secret',
      userId: 'userId',
      dialogUrls: {
        dialog: 'url'
      },
      locale: 'fr_FR'
    })

    config.resetConfig()
  })

  it('sets the not implmeented action to do nothing', async () => {
    config.notImplemented('method')

    expect(notImplementedAction).not.toHaveBeenCalled()
  })

  it('sets the missing configuration action to throw an error', async () => {
    expect(() => config.missingConfiguration('method', 'option')).toThrow('Missing configuration for method: option')
    expect(missingConfigurationAction).not.toHaveBeenCalled()
  })

  it('sets a default request adapter that does nothing', async () => {
    expect(config.requestAdapter).toBeInstanceOf(RequestAdapter)

    config.requestAdapter.request()

    expect(notImplementedAction).not.toHaveBeenCalled()
  })

  it('sets the client key to null', async () => {
    expect(config.clientKey).toBeNull()
  })

  it('sets the shared secret to null', async () => {
    expect(config.sharedSecret).toBeNull()
  })

  it('sets the user ID to null', async () => {
    expect(config.userId).toBeNull()
  })

  it('sets the dialog URLs to an empty object', async () => {
    expect(config.dialogUrls).toEqual({})
  })

  it('sets the locale to null', async () => {
    expect(config.locale).toBeNull()
  })
})
