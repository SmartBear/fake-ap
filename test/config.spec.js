import RequestAdapter from 'request-adapter'
import config from 'config'

describe('default configuration', () => {
  it('sets the missing configuration action to throw an error', () => {
    expect(() => config.missingConfiguration('method', 'option')).toThrow('Missing configuration for method: option')
  })

  it('sets a default request adapter that does nothing', () => {
    expect(config.requestAdapter).toBeInstanceOf(RequestAdapter)
  })

  it('sets the client key to null', () => {
    expect(config.clientKey).toBeNull()
  })

  it('sets the shared secret to null', () => {
    expect(config.sharedSecret).toBeNull()
  })

  it('sets the user ID to null', () => {
    expect(config.userId).toBeNull()
  })

  it('sets the dialog URLs to an empty object', () => {
    expect(config.dialogUrls).toEqual({})
  })

  it('sets the locale to null', () => {
    expect(config.locale).toBeNull()
  })

  it('sets the mount dialogs option to true', () => {
    expect(config.mountDialogs).toEqual(true)
  })

  it('sets the mount flags option to true', () => {
    expect(config.mountFlags).toEqual(true)
  })
})

describe('setConfig', () => {
  const notImplementedAction = jest.fn()
  const missingConfigurationAction = jest.fn()
  const getContextAction = jest.fn()
  const requestAdapter = new RequestAdapter(notImplementedAction)

  beforeEach(() => {
    config.setConfig({
      notImplementedAction,
      missingConfigurationAction,
      getContextAction,
      requestAdapter,
      clientKey: 'key',
      sharedSecret: 'secret',
      userId: 'user',
      dialogUrls: {
        dialog: 'url'
      },
      locale: 'en_US',
      mountDialogs: false,
      mountFlags: false
    })

    notImplementedAction.mockClear()
    missingConfigurationAction.mockClear()
    getContextAction.mockClear()
  })

  describe('when a not implemented action is provided', () => {
    describe('when the not implemented action is a function', () => {
      const newNotImplementedAction = jest.fn()

      beforeEach(() => {
        config.setConfig({ notImplementedAction: newNotImplementedAction })

        newNotImplementedAction.mockClear()
      })

      it('sets the not implemented action to the provided action', () => {
        config.notImplemented('method', 'args')

        expect(newNotImplementedAction).toHaveBeenCalledWith('method', 'args')
        expect(notImplementedAction).not.toHaveBeenCalled()
      })

      it('does not change other options', () => {
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.getContextAction).toBe(getContextAction)
        expect(config.clientKey).toEqual('key')
        expect(config.sharedSecret).toEqual('secret')
        expect(config.userId).toEqual('user')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })

    describe('when the not implemented action is not a function', () => {
      const newNotImplementedAction = 'action'

      beforeEach(() => {
        config.setConfig({ notImplementedAction: newNotImplementedAction })
      })

      it('does not set the not implemented action to the provided action', () => {
        config.notImplemented('method', 'args')

        expect(notImplementedAction).toHaveBeenCalled()
      })

      it('does not change other options', () => {
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.getContextAction).toBe(getContextAction)
        expect(config.clientKey).toEqual('key')
        expect(config.sharedSecret).toEqual('secret')
        expect(config.userId).toEqual('user')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })
  })

  describe('when a missing configuration action is provided', () => {
    describe('when the missing configuration action is a function', () => {
      const newMissingConfigurationAction = jest.fn()

      beforeEach(() => {
        config.setConfig({ missingConfigurationAction: newMissingConfigurationAction })

        newMissingConfigurationAction.mockClear()
      })

      it('sets the missing configuration action to the provided action', () => {
        config.missingConfiguration('method', 'option')

        expect(newMissingConfigurationAction).toHaveBeenCalledWith('method', 'option')
        expect(missingConfigurationAction).not.toHaveBeenCalled()
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.getContextAction).toBe(getContextAction)
        expect(config.clientKey).toEqual('key')
        expect(config.sharedSecret).toEqual('secret')
        expect(config.userId).toEqual('user')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })

    describe('when the missing configuration action is not a function', () => {
      const newMissingConfigurationAction = 'action'

      beforeEach(() => {
        config.setConfig({ missingConfigurationAction: newMissingConfigurationAction })
      })

      it('sets the missing configuration action to the provided action', () => {
        config.missingConfiguration('method', 'option')

        expect(missingConfigurationAction).toHaveBeenCalled()
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.getContextAction).toBe(getContextAction)
        expect(config.clientKey).toEqual('key')
        expect(config.sharedSecret).toEqual('secret')
        expect(config.userId).toEqual('user')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })
  })

  describe('when a request adapter is provided', () => {
    describe('when the request adapter has the correct type', () => {
      const newRequestAdapter = new RequestAdapter()

      beforeEach(() => {
        config.setConfig({ requestAdapter: newRequestAdapter })
      })

      it('sets the request adapter to the provided request adapter', () => {
        expect(config.requestAdapter).toBe(newRequestAdapter)
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.getContextAction).toBe(getContextAction)
        expect(config.clientKey).toEqual('key')
        expect(config.sharedSecret).toEqual('secret')
        expect(config.userId).toEqual('user')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })

    describe('when the request adapter does not have the correct type', () => {
      const newRequestAdapter = 'adapter'

      beforeEach(() => {
        config.setConfig({ requestAdapter: newRequestAdapter })
      })

      it('does not set the request adapter to the provided request adapter', () => {
        expect(config.requestAdapter).toBe(requestAdapter)
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.getContextAction).toBe(getContextAction)
        expect(config.clientKey).toEqual('key')
        expect(config.sharedSecret).toEqual('secret')
        expect(config.userId).toEqual('user')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })
  })

  describe('when a getContextAction is provided', () => {
    describe('when the getContextAction has the correct type', () => {
      const newGetContextAction = jest.fn()

      beforeEach(() => {
        config.setConfig({ getContextAction: newGetContextAction })
      })

      it('sets the getContextAction to the provided action', () => {
        expect(config.getContextAction).toBe(newGetContextAction)
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.clientKey).toEqual('key')
        expect(config.sharedSecret).toEqual('secret')
        expect(config.userId).toEqual('user')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })

    describe('when getContextAction does not have the correct type', () => {
      const newGetContextAction = 'adapter'

      beforeEach(() => {
        config.setConfig({ getContextAction: newGetContextAction })
      })

      it('does not set getContextAction', () => {
        expect(config.getContextAction).toBe(getContextAction)
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.clientKey).toEqual('key')
        expect(config.sharedSecret).toEqual('secret')
        expect(config.userId).toEqual('user')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })
  })

  describe('when a client key is provided', () => {
    describe('when the client key is not empty', () => {
      beforeEach(() => {
        config.setConfig({ clientKey: 'new key' })
      })

      it('sets the client key to the provided client key', () => {
        expect(config.clientKey).toEqual('new key')
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.sharedSecret).toEqual('secret')
        expect(config.userId).toEqual('user')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })

    describe('when the client key is empty', () => {
      beforeEach(() => {
        config.setConfig({ clientKey: '' })
      })

      it('sets the client key to the provided client key', () => {
        expect(config.clientKey).toEqual('')
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.sharedSecret).toEqual('secret')
        expect(config.userId).toEqual('user')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })
  })

  describe('when a shared secret is provided', () => {
    describe('when the shared secret is not empty', () => {
      beforeEach(() => {
        config.setConfig({ sharedSecret: 'new secret' })
      })

      it('sets the shared secret to the provided shared secret', () => {
        expect(config.sharedSecret).toEqual('new secret')
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.clientKey).toEqual('key')
        expect(config.userId).toEqual('user')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })

    describe('when the shared secret is empty', () => {
      beforeEach(() => {
        config.setConfig({ sharedSecret: '' })
      })

      it('sets the shared secret to the provided shared secret', () => {
        expect(config.sharedSecret).toEqual('')
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.clientKey).toEqual('key')
        expect(config.userId).toEqual('user')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })
  })

  describe('when a user ID is provided', () => {
    describe('when the user ID is not empty', () => {
      beforeEach(() => {
        config.setConfig({ userId: 'new user' })
      })

      it('sets the user ID to the provided user ID', () => {
        expect(config.userId).toEqual('new user')
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.clientKey).toEqual('key')
        expect(config.sharedSecret).toEqual('secret')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })

    describe('when the user ID is empty', () => {
      beforeEach(() => {
        config.setConfig({ userId: '' })
      })

      it('sets the user ID to the provided user ID', () => {
        expect(config.userId).toEqual('')
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.clientKey).toEqual('key')
        expect(config.sharedSecret).toEqual('secret')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })
  })

  describe('when dialog URLs are provided', () => {
    describe('when the dialog URLs option is not empty', () => {
      beforeEach(() => {
        config.setConfig({ dialogUrls: { otherDialog: 'other url' } })
      })

      it('sets the dialog URLs to the provided dialog URLs', () => {
        expect(config.dialogUrls).toEqual({ otherDialog: 'other url' })
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.clientKey).toEqual('key')
        expect(config.sharedSecret).toEqual('secret')
        expect(config.userId).toEqual('user')
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })

    describe('when the dialog URLs option is empty', () => {
      beforeEach(() => {
        config.setConfig({ dialogUrls: {} })
      })

      it('sets the dialog URLs to the provided dialog URLs', () => {
        expect(config.dialogUrls).toEqual({})
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.clientKey).toEqual('key')
        expect(config.sharedSecret).toEqual('secret')
        expect(config.userId).toEqual('user')
        expect(config.locale).toEqual('en_US')
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })
  })

  describe('when a locale is provided', () => {
    describe('when the locale is not empty', () => {
      beforeEach(() => {
        config.setConfig({ locale: 'fr_FR' })
      })

      it('sets the locale to the provided locale', () => {
        expect(config.locale).toEqual('fr_FR')
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.clientKey).toEqual('key')
        expect(config.sharedSecret).toEqual('secret')
        expect(config.userId).toEqual('user')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })

    describe('when the locale is empty', () => {
      beforeEach(() => {
        config.setConfig({ locale: '' })
      })

      it('sets the locale to the provided locale', () => {
        expect(config.locale).toEqual('')
      })

      it('does not change other options', () => {
        expect(config.notImplemented).toBe(notImplementedAction)
        expect(config.missingConfiguration).toBe(missingConfigurationAction)
        expect(config.requestAdapter).toBe(requestAdapter)
        expect(config.clientKey).toEqual('key')
        expect(config.sharedSecret).toEqual('secret')
        expect(config.userId).toEqual('user')
        expect(config.dialogUrls).toEqual({ dialog: 'url' })
        expect(config.mountDialogs).toEqual(false)
        expect(config.mountFlags).toEqual(false)
      })
    })
  })

  describe('when multiple options are provided', () => {
    beforeEach(() => {
      config.setConfig({
        clientKey: 'new key',
        sharedSecret: 'new secret',
        dialogUrls: {
          other_dialog: 'other url'
        },
        mountDialogs: true
      })
    })

    it('sets the provided options', () => {
      expect(config.clientKey).toEqual('new key')
      expect(config.sharedSecret).toEqual('new secret')
      expect(config.dialogUrls).toEqual({ other_dialog: 'other url' })
      expect(config.mountDialogs).toEqual(true)
    })

    it('does not change other options', () => {
      expect(config.notImplemented).toBe(notImplementedAction)
      expect(config.missingConfiguration).toBe(missingConfigurationAction)
      expect(config.requestAdapter).toBe(requestAdapter)
      expect(config.userId).toEqual('user')
      expect(config.locale).toEqual('en_US')
      expect(config.mountFlags).toEqual(false)
    })
  })
})

describe('resetConfig', () => {
  const notImplementedAction = jest.fn()
  const missingConfigurationAction = jest.fn()

  beforeEach(() => {
    config.setConfig({
      notImplementedAction,
      missingConfigurationAction,
      requestAdapter: new RequestAdapter(notImplementedAction),
      clientKey: 'key',
      sharedSecret: 'secret',
      userId: 'user',
      dialogUrls: {
        dialog: 'url'
      },
      locale: 'fr_FR',
      mountDialogs: false,
      mountFlags: false
    })

    config.resetConfig()
  })

  it('sets the not implemented action to do nothing', () => {
    config.notImplemented('method')

    expect(notImplementedAction).not.toHaveBeenCalled()
  })

  it('sets the missing configuration action to throw an error', () => {
    expect(() => config.missingConfiguration('method', 'option')).toThrow('Missing configuration for method: option')
    expect(missingConfigurationAction).not.toHaveBeenCalled()
  })

  it('sets a default request adapter that does nothing', () => {
    expect(config.requestAdapter).toBeInstanceOf(RequestAdapter)

    config.requestAdapter.request()

    expect(notImplementedAction).not.toHaveBeenCalled()
  })

  it('sets the client key to null', () => {
    expect(config.clientKey).toBeNull()
  })

  it('sets the shared secret to null', () => {
    expect(config.sharedSecret).toBeNull()
  })

  it('sets the user ID to null', () => {
    expect(config.userId).toBeNull()
  })

  it('sets the dialog URLs to an empty object', () => {
    expect(config.dialogUrls).toEqual({})
  })

  it('sets the locale to null', () => {
    expect(config.locale).toBeNull()
  })

  it('sets the mount dialogs option to true', () => {
    expect(config.mountDialogs).toEqual(true)
  })

  it('sets the mount flags option to true', () => {
    expect(config.mountFlags).toEqual(true)
  })
})
