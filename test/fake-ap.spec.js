import React from 'react'
import { act, waitFor, within } from '@testing-library/react'
import * as jwt from 'atlassian-jwt'
import _get from 'lodash/get'
import config from 'config'
import RequestAdapter from 'request-adapter'
import FakeAP from 'fake-ap'

const now = Date.now()
jest.spyOn(Date, 'now').mockReturnValue(now)

let AP = null
let options = null

beforeEach(async () => {
  await act(async () => {
    AP = new FakeAP()
  })

  config.resetConfig()
})

afterEach(() => {
  AP.unmount()
})

describe('context', () => {
  describe('getToken', () => {
    const clientKey = 'key'
    const sharedSecret = 'secret'
    const userId = 'user'

    beforeEach(() => {
      options = { clientKey, sharedSecret, userId }
    })

    describe('when a client key, a shared secret and a user ID are provided', () => {
      beforeEach(() => {
        AP.configure(options)
      })

      it('returns a token as a promise and calls the provided callback with the token', async () => {
        const callback = jest.fn()

        const token = await AP.context.getToken(callback)

        expect(callback).toHaveBeenCalledWith(token)
      })

      it('includes the client key, user ID and QSH', async () => {
        const token = await AP.context.getToken()

        const payload = jwt.decodeSymmetric(token, null, 'HS256', true)

        expect(payload).toHaveProperty('iss', clientKey)
        expect(payload).toHaveProperty('sub', userId)
        expect(payload).toHaveProperty('qsh', 'context-qsh')
      })

      it('is valid for 5 minutes', async () => {
        const token = await AP.context.getToken()

        const payload = jwt.decodeSymmetric(token, null, 'HS256', true)

        expect(payload).toHaveProperty('iat', Math.trunc(now / 1000))
        expect(payload).toHaveProperty('exp', Math.trunc(now / 1000) + 300)
      })

      it('is signed using the shared secret', async () => {
        const token = await AP.context.getToken()

        expect(() => jwt.decodeSymmetric(token, sharedSecret, 'HS256')).not.toThrow()
      })

      describe('when a context is provided', () => {
        beforeEach(() => {
          AP.configure({ context: { key: 'value' } })
        })

        it('includes the context', async () => {
          const token = await AP.context.getToken()

          const payload = jwt.decodeSymmetric(token, null, 'HS256', true)

          expect(payload).toHaveProperty('context', { key: 'value' })
        })
      })

      describe('when no context is provided', () => {
        it('includes an empty context', async () => {
          const token = await AP.context.getToken()

          const payload = jwt.decodeSymmetric(token, null, 'HS256', true)

          expect(payload).toHaveProperty('context', {})
        })
      })
    })

    describe('when no client key is provided', () => {
      describe('when a missingConfigurationAction method is provided', () => {
        const missingConfigurationAction = jest.fn(() => 'result')

        beforeEach(() => {
          const { clientKey, ...missingConfigurationOptions } = options

          AP.configure({ ...missingConfigurationOptions, missingConfigurationAction })

          missingConfigurationAction.mockClear()
        })

        it('calls the provided missingConfigurationAction method', async () => {
          await AP.context.getToken()

          expect(missingConfigurationAction).toHaveBeenCalledWith('AP.context.getToken', 'clientKey')
        })

        it('returns the result from the call', async () => {
          const result = await AP.context.getToken()

          expect(result).toEqual('result')
        })
      })

      describe('when no missingConfigurationAction method is provided', () => {
        beforeEach(() => {
          const { clientKey, ...missingConfigurationOptions } = options

          AP.configure(missingConfigurationOptions)
        })

        it('throws an error', async () => {
          const promise = AP.context.getToken()

          await expect(promise).rejects.toEqual(
            new Error('Missing configuration for AP.context.getToken: clientKey')
          )
        })
      })
    })

    describe('when no shared secret is provided', () => {
      describe('when a missingConfigurationAction method is provided', () => {
        const missingConfigurationAction = jest.fn(() => 'result')

        beforeEach(() => {
          const { sharedSecret, ...missingConfigurationOptions } = options

          AP.configure({ ...missingConfigurationOptions, missingConfigurationAction })

          missingConfigurationAction.mockClear()
        })

        it('calls the provided missingConfigurationAction method', async () => {
          await AP.context.getToken()

          expect(missingConfigurationAction).toHaveBeenCalledWith('AP.context.getToken', 'sharedSecret')
        })

        it('returns the result from the call', async () => {
          const result = await AP.context.getToken()

          expect(result).toEqual('result')
        })
      })

      describe('when no missingConfigurationAction method is provided', () => {
        beforeEach(() => {
          const { sharedSecret, ...missingConfigurationOptions } = options

          AP.configure(missingConfigurationOptions)
        })

        it('throws an error', async () => {
          const promise = AP.context.getToken()

          await expect(promise).rejects.toEqual(
            new Error('Missing configuration for AP.context.getToken: sharedSecret')
          )
        })
      })
    })

    describe('when no user ID is provided', () => {
      describe('when a missingConfigurationAction method is provided', () => {
        const missingConfigurationAction = jest.fn(() => 'result')

        beforeEach(() => {
          const { userId, ...missingConfigurationOptions } = options

          AP.configure({ ...missingConfigurationOptions, missingConfigurationAction })

          missingConfigurationAction.mockClear()
        })

        it('calls the provided missingConfigurationAction method', async () => {
          await AP.context.getToken()

          expect(missingConfigurationAction).toHaveBeenCalledWith('AP.context.getToken', 'userId')
        })

        it('returns the result from the call', async () => {
          const result = await AP.context.getToken()

          expect(result).toEqual('result')
        })
      })

      describe('when no missingConfigurationAction method is provided', () => {
        beforeEach(() => {
          const { userId, ...missingConfigurationOptions } = options

          AP.configure(missingConfigurationOptions)
        })

        it('throws an error', async () => {
          const promise = AP.context.getToken()

          await expect(promise).rejects.toEqual(
            new Error('Missing configuration for AP.context.getToken: userId')
          )
        })
      })
    })
  })

  describe('getContext', () => {
    describe('when a context is provided', () => {
      beforeEach(() => {
        AP.configure({ context: { key: 'value' } })
      })

      it('returns the context as a promise', async () => {
        const context = await AP.context.getContext()

        expect(context).toEqual({ key: 'value' })
      })

      it('calls the provided callback with the context', async () => {
        const callback = jest.fn()

        await AP.context.getContext(callback)

        expect(callback).toHaveBeenCalledWith({ key: 'value' })
      })
    })

    describe('when no context is provided', () => {
      it('returns an empty context as a promise', async () => {
        const context = await AP.context.getContext()

        expect(context).toEqual({})
      })

      it('calls the provided callback with an empty context', async () => {
        const callback = jest.fn()

        await AP.context.getContext(callback)

        expect(callback).toHaveBeenCalledWith({})
      })
    })
  })
})

describe('dialog', () => {
  const windowListener = jest.fn()

  beforeAll(() => {
    window.addEventListener('message', windowListener)
  })

  afterAll(() => {
    window.removeEventListener('message', windowListener)
  })

  beforeEach(() => {
    AP.configure({ dialogUrls: { dialog: 'localhost' } })

    windowListener.mockClear()
  })

  afterEach(async () => {
    windowListener.mockClear()

    act(() => {
      AP.dialog.close()
    })

    await waitFor(() => {
      expect(windowListener).toHaveBeenCalled()
    })
  })

  describe('when the Dialogs component is not already mounted', () => {
    beforeEach(() => {
      AP.unmount()
    })

    it('mounts a Dialogs component to display flags', () => {
      expect(document.body.querySelectorAll('#ap_dialogs')).toHaveLength(1)
    })
  })

  describe('when the Dialogs component is already mounted', () => {
    beforeEach(async () => {
      await act(async () => {
        // eslint-disable-next-line no-new
        new FakeAP()
      })
    })

    it('does not mount another Dialogs component', () => {
      expect(document.body.querySelectorAll('#ap_dialogs')).toHaveLength(1)
    })
  })

  describe('create', () => {
    it('opens a dialog', () => {
      act(() => {
        AP.dialog.create({ key: 'dialog' })
      })

      expect(document.body.querySelector('iframe')).toBeInTheDocument()
    })
  })

  describe('close', () => {
    it('closes the current dialog', async () => {
      act(() => {
        AP.dialog.create({ key: 'dialog' })
        AP.dialog.close()
      })

      await waitFor(() => {
        expect(windowListener).toHaveBeenCalled()
      })

      expect(document.body.querySelector('iframe')).not.toBeInTheDocument()
    })
  })

  describe('getCustomData', () => {
    let unmockWindowPostMessage = null

    beforeEach(() => {
      act(() => {
        AP.dialog.create({ key: 'dialog', customData: { name: 'value' } })
      })

      unmockWindowPostMessage = mockPostMessage(window, window)
    })

    afterEach(() => {
      unmockWindowPostMessage()
    })

    it('calls the provided callback with the custom data provided on creation', async () => {
      const callback = jest.fn()

      AP.dialog.getCustomData(callback)

      await waitFor(() => {
        expect(callback).toHaveBeenCalled()
      })

      expect(callback).toHaveBeenCalledWith({ name: 'value' })
    })
  })
})

describe('events', () => {
  describe('on', () => {
    it('registers a listener to be called every time the provided event is emitted', () => {
      const listener = jest.fn()

      AP.events.emit('event')

      expect(listener).not.toHaveBeenCalled()

      AP.events.on('event', listener)
      AP.events.emit('event')
      AP.events.emit('event')

      expect(listener).toHaveBeenCalledTimes(2)
    })
  })

  describe('once', () => {
    it('registers a listener to be called once the provided event is emitted', () => {
      const listener = jest.fn()

      AP.events.emit('event')

      expect(listener).not.toHaveBeenCalled()

      AP.events.once('event', listener)
      AP.events.emit('event')

      expect(listener).toHaveBeenCalledTimes(1)

      AP.events.emit('event')
      expect(listener).toHaveBeenCalledTimes(1)
    })
  })

  describe('off', () => {
    it('removes a listener for the provided event', () => {
      const listener = jest.fn()

      AP.events.on('event', listener)
      AP.events.emit('event')
      AP.events.emit('event')

      expect(listener).toHaveBeenCalledTimes(2)

      AP.events.off('event', listener)
      AP.events.emit('event')

      expect(listener).toHaveBeenCalledTimes(2)
    })
  })

  describe('emit', () => {
    it('calls all listeners registered for the provided event using the provided payload', () => {
      const firstListener = jest.fn()
      const secondListener = jest.fn()

      AP.events.on('event', firstListener)
      AP.events.on('event', secondListener)

      const args = {
        hello: 'world'
      }

      AP.events.emit('event', args)

      expect(firstListener).toHaveBeenCalledWith(args)
      expect(secondListener).toHaveBeenCalledWith(args)
    })

    it('does not call listeners registered for another event', () => {
      const firstListener = jest.fn()
      const secondListener = jest.fn()
      const otherListener = jest.fn()

      AP.events.on('event', firstListener)
      AP.events.on('event', secondListener)
      AP.events.on('other_event', otherListener)

      AP.events.emit('event')

      expect(firstListener).toHaveBeenCalled()
      expect(secondListener).toHaveBeenCalled()
      expect(otherListener).not.toHaveBeenCalled()
    })
  })
})

describe('flag', () => {
  describe('when the Flags component is not already mounted', () => {
    beforeEach(() => {
      AP.unmount()
    })

    it('mounts a Flags component to display flags', () => {
      expect(document.body.querySelectorAll('#ap_flags')).toHaveLength(1)
    })
  })

  describe('when the Flags component is already mounted', () => {
    beforeEach(async () => {
      await act(async () => {
        // eslint-disable-next-line no-new
        new FakeAP()
      })
    })

    it('does not mount another Flags component', () => {
      expect(document.body.querySelectorAll('#ap_flags')).toHaveLength(1)
    })
  })

  describe('create', () => {
    afterEach(() => {
      act(() => {
        for (let id = 1; id <= AP.flag._nextId; id++) {
          AP.events.emit('flag.close', id)
        }
      })
    })

    it('creates flags', () => {
      act(() => {
        AP.flag.create({ title: 'Flag 1' })
        AP.flag.create({ title: 'Flag 2' })
      })

      expect(within(document.getElementById('ap_flags')).queryByText('Flag 1')).toBeInTheDocument()
      expect(within(document.getElementById('ap_flags')).queryByText('Flag 2')).toBeInTheDocument()
    })

    it('returns an object with a close method that closes the flag', () => {
      act(() => {
        const flag = AP.flag.create({ title: 'Flag 1' })
        AP.flag.create({ title: 'Flag 2' })

        flag.close()
      })

      expect(within(document.getElementById('ap_flags')).queryByText('Flag 1')).not.toBeInTheDocument()
      expect(within(document.getElementById('ap_flags')).queryByText('Flag 2')).toBeInTheDocument()
    })
  })
})

describe('history', () => {
  afterEach(() => {
    window.location.hash = ''
  })

  describe('initialState', () => {
    beforeEach(async () => {
      await act(async () => {
        AP = new FakeAP({ initialState: 'route=plop' })
      })
    })

    it('is set to the location state', () => {
      expect(AP.history.getState()).toEqual('route=plop')
    })
  })

  describe('getState', () => {
    it('returns the current state', () => {
      expect(AP.history.getState()).toEqual('')

      AP.history.pushState('state')

      expect(AP.history.getState()).toEqual('state')

      AP.history.pushState('other_state')

      expect(AP.history.getState()).toEqual('other_state')
    })
  })

  describe('popState', () => {
    it('registers a listener that is called every time the state is changed using pushState', () => {
      const listener = jest.fn()
      AP.history.popState(listener)

      AP.history.pushState('state')

      expect(listener).toHaveBeenCalledTimes(1)

      AP.history.pushState('other_state')

      expect(listener).toHaveBeenCalledTimes(2)
    })
  })

  describe('pushState', () => {
    it('changes the hash of the current location', () => {
      expect(window.location.hash).toEqual('')

      AP.history.pushState('state')

      expect(window.location.hash).toEqual('#!state')

      AP.history.pushState('other_state')

      expect(window.location.hash).toEqual('#!other_state')
    })
  })

  describe('_clearHistory', () => {
    const listener = jest.fn()

    beforeEach(() => {
      listener.mockClear()

      AP.history.popState(listener)
      AP.history.pushState('state')
      AP.history._clearHistory()
    })

    it('clears the hash of the current location', () => {
      expect(window.location.hash).toEqual('')
    })

    it('clears the current state', () => {
      expect(AP.history.getState()).toEqual('')
    })

    it('clears the list of listeners', () => {
      AP.history.pushState('other_state')

      expect(listener).toHaveBeenCalledTimes(1)
    })
  })
})

describe('user', () => {
  describe('getLocale', () => {
    describe('when a locale is provided in configuration', () => {
      beforeEach(() => {
        AP.configure({ locale: 'fr_FR' })
      })

      it('calls the provided callback with the configuration locale', () => {
        const callback = jest.fn()

        AP.user.getLocale(callback)

        expect(callback).toHaveBeenCalledWith('fr_FR')
      })
    })

    describe('when no locale is provided in configuration', () => {
      it('calls the provided callback with english set as the locale', () => {
        const callback = jest.fn()

        AP.user.getLocale(callback)

        expect(callback).toHaveBeenCalledWith('en_US')
      })
    })
  })
})

describe('request', () => {
  describe('when no request adapter is provided in configuration', () => {
    const notImplementedAction = jest.fn()

    beforeEach(() => {
      AP.configure({ notImplementedAction })

      notImplementedAction.mockClear()
    })

    it('calls the not implemented action', async () => {
      await AP.request('localhost', { type: 'POST' })

      expect(notImplementedAction).toHaveBeenCalledWith('AP.request', { data: {}, method: 'POST', path: 'localhost' })
    })

    it('returns a response with empty data', async () => {
      const response = await AP.request('localhost', { type: 'POST' })

      expect(response).toEqual({
        body: JSON.stringify({})
      })
    })
  })

  describe('when a request adapter is provided in configuration', () => {
    const requestAdapter = new RequestAdapter()
    requestAdapter.request = jest.fn()

    beforeEach(() => {
      AP.configure({ requestAdapter })

      requestAdapter.request.mockClear()
    })

    it('calls the adapter request with the method set as an uppercase string based on the provided type', async () => {
      await AP.request('localhost', { type: 'post' })

      expect(requestAdapter.request).toHaveBeenCalledWith(expect.objectContaining({ method: 'POST' }))
    })

    it('sets the default method to GET', async () => {
      await AP.request('localhost')

      expect(requestAdapter.request).toHaveBeenCalledWith(expect.objectContaining({ method: 'GET' }))
    })

    it('calls the adapter request with the path based on the provided URL', async () => {
      await AP.request('localhost')

      expect(requestAdapter.request).toHaveBeenCalledWith(expect.objectContaining({ path: 'localhost' }))
    })

    it('calls the adapter request with the data based on the provided data', async () => {
      await AP.request('localhost', { data: { name: 'value' } })

      expect(requestAdapter.request).toHaveBeenCalledWith(expect.objectContaining({ data: { name: 'value' } }))
    })

    it('sets the default data to an empty object', async () => {
      await AP.request('localhost')

      expect(requestAdapter.request).toHaveBeenCalledWith(expect.objectContaining({ data: {} }))
    })

    it('returns the response from the adapter', async () => {
      requestAdapter.request.mockResolvedValueOnce({ body: 'response' })

      const response = await AP.request('localhost')

      expect(response).toEqual({
        body: 'response'
      })
    })
  })
})

describe('disabling Dialogs and Flags components', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  describe('when mountDialogs is set to false', () => {
    it('does not mount the Dialogs component', async () => {
      await act(async () => {
        // eslint-disable-next-line no-new
        new FakeAP({
          mountDialogs: false
        })
      })

      expect(document.querySelector('#ap_dialogs')).not.toBeInTheDocument()
    })
  })

  describe('when mountFlags is set to false', () => {
    it('does not mount the Flags component', async () => {
      await act(async () => {
        // eslint-disable-next-line no-new
        new FakeAP({
          mountFlags: false
        })
      })

      expect(document.querySelector('#ap_flags')).not.toBeInTheDocument()
    })
  })
})

const notImplementedMethods = [
  'cookie.save',
  'cookie.read',
  'cookie.erase',
  'dialog.getButton',
  'dialog.disableCloseOnSubmit',
  'dialog.createButton',
  'dialog.isCloseOnEscape',
  'events.onPublic',
  'events.oncePublic',
  'events.onAny',
  'events.onAnyPublic',
  'events.offPublic',
  'events.offAll',
  'events.offAllPublic',
  'events.offAny',
  'events.offAnyPublic',
  'events.emitPublic',
  'history.back',
  'history.forward',
  'history.go',
  'history.replaceState',
  'host.getSelectedText',
  'resize',
  'sizeToParent',
  'inlineDialog.hide',
  'jira.refreshIssuePage',
  'jira.getWorkflowConfiguration',
  'jira.isDashboardItemEditable',
  'jira.openCreateIssueDialog',
  'jira.setDashboardItemTitle',
  'jira.openDatePicker',
  'jira.initJQLEditor',
  'jira.showJQLEditor',
  'jira.isNativeApp',
  'navigator.getLocation',
  'navigator.go',
  'navigator.reload',
  'user.getCurrentUser',
  'user.getTimeZone'
]

describe('Not implemented methods', () => {
  describe.each(notImplementedMethods)('AP.%s', method => {
    describe('when a notImplementedAction method is provided', () => {
      const notImplementedAction = jest.fn(() => 'result')

      beforeEach(() => {
        AP.configure({ notImplementedAction })

        notImplementedAction.mockClear()
      })

      it('calls the provided notImplementedAction method', async () => {
        const args = ['hello', 'world']

        await _get(AP, method)(...args)

        expect(notImplementedAction).toHaveBeenCalledWith(`AP.${method}`, ...args)
      })

      it('returns the result from the call', async () => {
        const result = await _get(AP, method)()

        expect(result).toEqual('result')
      })
    })

    describe('when no notImplementedAction method is provided', () => {
      it('does not return anything', async () => {
        const result = await _get(AP, method)()

        expect(result).toBeUndefined()
      })
    })
  })
})
