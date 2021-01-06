import React from 'react'
import { render, act, waitFor } from '@testing-library/react'
import events from 'modules/events'
import Dialogs from 'components/Dialogs'

describe('Dialogs', () => {
  const windowMessageListener = jest.fn()
  const dialogMessageListener = jest.fn()
  let dialogs = null

  beforeEach(() => {
    dialogs = render(<Dialogs />)

    windowMessageListener.mockClear()
    dialogMessageListener.mockClear()

    window.addEventListener('message', windowMessageListener)
  })

  afterEach(() => {
    window.removeEventListener('message', windowMessageListener)
  })

  describe('when no dialog is set', () => {
    it('renders nothing', () => {
      expect(dialogs.container).toBeEmptyDOMElement()
    })
  })

  describe('when a dialog is created', () => {
    describe('when the dialog URL is not empty', () => {
      let iframe = null
      let unmockWindowPostMessage = null
      let unmockDialogPostMessage = null

      beforeEach(() => {
        act(() => {
          events.emit('dialog.create', { url: 'localhost', customData: 'data' })
        })

        iframe = dialogs.container.querySelector('iframe')
        iframe.contentWindow.addEventListener('message', dialogMessageListener)

        unmockWindowPostMessage = mockPostMessage(window, iframe.contentWindow)
        unmockDialogPostMessage = mockPostMessage(iframe.contentWindow, window)
      })

      afterEach(() => {
        iframe.contentWindow.removeEventListener('message', dialogMessageListener)

        unmockWindowPostMessage()
        unmockDialogPostMessage()
      })

      it('renders an iframe with the provided URL', () => {
        expect(iframe).toBeInTheDocument()
        expect(iframe).toHaveAttribute('src', 'localhost')
      })

      describe('when a getCustomData message is sent', () => {
        beforeEach(async () => {
          act(() => {
            window.postMessage({ type: 'AP.dialog.getCustomData' }, '*')
          })

          await waitFor(() => {
            // eslint-disable-next-line jest/no-standalone-expect
            expect(windowMessageListener).toHaveBeenCalled()
          })
        })
        it('responds to the message with the provided custom data', () => {
          expect(dialogMessageListener).toHaveBeenCalledWith(
            expect.objectContaining({
              data: {
                type: 'AP.dialog.customData',
                customData: 'data'
              },
              source: window
            })
          )
        })
      })

      describe('when a close message is sent', () => {
        const listener = jest.fn()

        beforeEach(async () => {
          events.on('dialog.close', listener)
          listener.mockClear()

          act(() => {
            window.postMessage({ type: 'AP.dialog.close', data: { name: 'value' } }, '*')
          })

          await waitFor(() => {
            // eslint-disable-next-line jest/no-standalone-expect
            expect(windowMessageListener).toHaveBeenCalled()
          })
        })

        afterEach(() => {
          events.off('dialog.close', listener)
        })

        it('closes the dialog', () => {
          expect(dialogs.container).toBeEmptyDOMElement()
        })

        it('emits a dialog.close event with the provided data', () => {
          expect(listener).toHaveBeenCalledWith({ name: 'value' })
        })

        it('is possible to open a new dialog, get custom data then close it again', async () => {
          listener.mockClear()

          iframe.contentWindow.removeEventListener('message', dialogMessageListener)

          unmockWindowPostMessage()
          unmockDialogPostMessage()

          act(() => {
            events.emit('dialog.create', { url: 'url', customData: 'other data' })
          })

          iframe = dialogs.container.querySelector('iframe')
          iframe.contentWindow.addEventListener('message', dialogMessageListener)

          unmockWindowPostMessage = mockPostMessage(window, iframe.contentWindow)
          unmockDialogPostMessage = mockPostMessage(iframe.contentWindow, window)

          expect(iframe).toBeInTheDocument()
          expect(iframe).toHaveAttribute('src', 'url')

          act(() => {
            window.postMessage({ type: 'AP.dialog.getCustomData' }, '*')
          })

          await waitFor(() => {
            expect(windowMessageListener).toHaveBeenCalled()
          })

          expect(dialogMessageListener).toHaveBeenCalledWith(
            expect.objectContaining({
              data: {
                type: 'AP.dialog.customData',
                customData: 'other data'
              },
              source: window
            })
          )

          act(() => {
            window.postMessage({ type: 'AP.dialog.close', data: { name: 'other value' } }, '*')
          })

          await waitFor(() => {
            expect(windowMessageListener).toHaveBeenCalled()
          })

          expect(dialogs.container).toBeEmptyDOMElement()
          expect(listener).toHaveBeenCalledWith({ name: 'other value' })
        })
      })
    })

    describe('when the dialog URL is empty', () => {
      beforeEach(() => {
        act(() => {
          events.emit('dialog.create', { url: '', customData: 'data' })
        })
      })

      it('renders nothing', () => {
        expect(dialogs.container).toBeEmptyDOMElement()
      })
    })

    describe('when the dialog URL is not provided', () => {
      beforeEach(() => {
        act(() => {
          events.emit('dialog.create', { customData: 'data' })
        })
      })

      it('renders nothing', () => {
        expect(dialogs.container).toBeEmptyDOMElement()
      })
    })
  })
})
