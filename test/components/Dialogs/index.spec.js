import React from 'react'
import { act, waitFor, within } from '@testing-library/react'
import events from 'modules/events'
import { mountComponentWhenDocumentIsReady } from 'utils/mount-component'
import Dialogs from 'components/Dialogs'

describe('Dialogs', () => {
  const windowMessageListener = jest.fn()
  const dialogMessageListener = jest.fn()
  let component = null
  let dialogs = null

  beforeAll(() => {
    window.addEventListener('message', windowMessageListener)
  })

  afterAll(() => {
    window.removeEventListener('message', windowMessageListener)
  })

  beforeEach(() => {
    component = mountComponentWhenDocumentIsReady(<Dialogs />, 'ap_dialogs')
    dialogs = within(document.getElementById('ap_dialogs'))

    windowMessageListener.mockClear()
    dialogMessageListener.mockClear()
  })

  afterEach(() => {
    component.unmount()
  })

  describe('when no dialog is set', () => {
    it('renders nothing', () => {
      expect(dialogs.container).toBeEmptyDOMElement()
    })
  })

  describe('when a dialog is created', () => {
    const dialogStates = [
      [
        'when no dialog is set',
        () => {}
      ],
      [
        'when another dialog already exists',
        () => {
          act(() => {
            events.emit('dialog.create', { url: 'previous_url', customData: 'previous data' })
          })
        }
      ],
      [
        'when another dialog was created then closed',
        async () => {
          act(() => {
            events.emit('dialog.create', { url: 'previous_url', customData: 'previous data' })
            window.postMessage({ type: 'AP.dialog.close', data: { name: 'value' } }, '*')
          })

          await waitFor(() => {
            expect(windowMessageListener).toHaveBeenCalled()
          })
        }
      ]
    ]

    describe.each(dialogStates)('%s', (_context, setState) => {
      beforeEach(async () => {
        await setState()
      })

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
})
