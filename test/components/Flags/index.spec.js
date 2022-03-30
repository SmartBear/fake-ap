import React from 'react'
import { fireEvent, act, within } from '@testing-library/react'
import events from 'modules/events'
import { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon } from 'components/Flags/icons'
import { mountComponentWhenDocumentIsReady } from 'utils/mount-component'
import Flags from 'components/Flags'

jest.useFakeTimers()

describe('Flags', () => {
  let component = null
  let flags = null

  beforeEach(() => {
    component = mountComponentWhenDocumentIsReady(<Flags />, 'ap_flags')
    flags = within(document.getElementById('ap_flags'))
  })

  afterEach(() => {
    component.unmount()
  })

  it('renders an empty container at the top right corner', () => {
    const container = flags.queryByTestId('ap-flags')

    expect(container).toBeEmptyDOMElement()
    expect(container).toHaveStyle({ position: 'fixed', top: '0', right: '30px' })
  })

  describe('when a flag is created', () => {
    it('displays the flag with the title and body', () => {
      const options = { title: 'Title', body: 'Body' }

      act(() => {
        events.emit('flag.create', { id: 1, options })
      })

      expect(flags.queryByText('Title')).toBeInTheDocument()
      expect(flags.queryByText('Body')).toBeInTheDocument()
    })

    it('adds the flag to existing flags', () => {
      const firstFlagOptions = { title: 'First title', body: 'First body' }
      const secondFlagOptions = { title: 'Second title', body: 'Second body' }

      act(() => {
        events.emit('flag.create', { id: 1, options: firstFlagOptions })
        events.emit('flag.create', { id: 2, options: secondFlagOptions })
      })

      expect(flags.queryByText('First title')).toBeInTheDocument()
      expect(flags.queryByText('First body')).toBeInTheDocument()
      expect(flags.queryByText('Second title')).toBeInTheDocument()
      expect(flags.queryByText('Second body')).toBeInTheDocument()
    })
  })

  describe('flag type', () => {
    it('can display an info flag', () => {
      const options = { type: 'info' }

      act(() => {
        events.emit('flag.create', { id: 1, options })
      })

      const infoIcon = render(<InfoIcon />).container

      expect(flags.getByTestId('ap-flag-type').innerHTML).toEqual(infoIcon.innerHTML)
    })

    it('can display a success flag', () => {
      const options = { type: 'success' }

      act(() => {
        events.emit('flag.create', { id: 1, options })
      })

      const successIcon = render(<SuccessIcon />).container

      expect(flags.getByTestId('ap-flag-type').innerHTML).toEqual(successIcon.innerHTML)
    })

    it('can display a warning flag', () => {
      const options = { type: 'warning' }

      act(() => {
        events.emit('flag.create', { id: 1, options })
      })

      const warningIcon = render(<WarningIcon />).container

      expect(flags.getByTestId('ap-flag-type').innerHTML).toEqual(warningIcon.innerHTML)
    })

    it('can display an error flag', () => {
      const options = { type: 'error' }

      act(() => {
        events.emit('flag.create', { id: 1, options })
      })

      const errorIcon = render(<ErrorIcon />).container

      expect(flags.getByTestId('ap-flag-type').innerHTML).toEqual(errorIcon.innerHTML)
    })

    it('defaults to an info flag', () => {
      const options = {}

      act(() => {
        events.emit('flag.create', { id: 1, options })
      })

      const infoIcon = render(<InfoIcon />).container

      expect(flags.getByTestId('ap-flag-type').innerHTML).toEqual(infoIcon.innerHTML)
    })
  })

  describe('actions', () => {
    beforeEach(() => {
      const options = { actions: { identifier: 'action name' } }

      act(() => {
        events.emit('flag.create', { id: 1, options })
      })
    })

    it('renders a button with the action name', () => {
      expect(flags.getByTestId('ap-flag-action')).toHaveTextContent('action name')
    })

    it('triggers a flag.action event including the action identifier', () => {
      const listener = jest.fn()
      events.on('flag.action', listener)

      fireEvent.click(flags.getByTestId('ap-flag-action'))

      expect(listener).toHaveBeenCalledWith({ actionIdentifier: 'identifier' })

      events.off('flag.action', listener)
    })
  })

  describe('close button', () => {
    beforeEach(() => {
      const firstFlagOptions = { title: 'First title' }
      const secondFlagOptions = { title: 'Second title' }
      const thirdFlagOptions = { title: 'Third title' }

      act(() => {
        events.emit('flag.create', { id: 1, options: firstFlagOptions })
        events.emit('flag.create', { id: 2, options: secondFlagOptions })
        events.emit('flag.create', { id: 3, options: thirdFlagOptions })
      })
    })

    it('removes the flag from the list of flags', () => {
      const secondFlag = flags.getAllByTestId('ap-flag').find(
        flag => within(flag).getByTestId('ap-flag-title').textContent === 'Second title'
      )

      fireEvent.click(within(secondFlag).getByTestId('ap-flag-close'))

      expect(flags.queryByText('Second title')).not.toBeInTheDocument()
    })
  })

  describe('close event', () => {
    beforeEach(() => {
      const firstFlagOptions = { title: 'First title' }
      const secondFlagOptions = { title: 'Second title' }
      const thirdFlagOptions = { title: 'Third title' }

      act(() => {
        events.emit('flag.create', { id: 1, options: firstFlagOptions })
        events.emit('flag.create', { id: 2, options: secondFlagOptions })
        events.emit('flag.create', { id: 3, options: thirdFlagOptions })
      })
    })

    it('is possible to close a flag using events and the flag ID', () => {
      act(() => {
        events.emit('flag.close', 2)
      })

      expect(flags.queryByText('Second title')).not.toBeInTheDocument()
    })
  })

  describe('close option', () => {
    beforeEach(() => {
      const firstFlagOptions = { title: 'Title 1', close: 'manual' }
      const secondFlagOptions = { title: 'Title 2', close: 'auto' }
      const thirdFlagOptions = { title: 'Title 3' }

      act(() => {
        events.emit('flag.create', { id: 1, options: firstFlagOptions })
        events.emit('flag.create', { id: 2, options: secondFlagOptions })
        events.emit('flag.create', { id: 3, options: thirdFlagOptions })
      })
    })

    it('does not close flags with close option set to manual', () => {
      expect(flags.queryByText('Title 1')).toBeInTheDocument()

      act(() => {
        jest.runAllTimers()
      })

      expect(flags.queryByText('Title 1')).toBeInTheDocument()
    })

    it('closes flags with close option set to auto after 4 seconds', () => {
      expect(flags.queryByText('Title 2')).toBeInTheDocument()

      jest.advanceTimersByTime(2000)

      expect(flags.queryByText('Title 2')).toBeInTheDocument()

      act(() => {
        jest.advanceTimersByTime(2000)
      })

      expect(flags.queryByText('Title 2')).not.toBeInTheDocument()
    })

    it('does not close flags with no close option', () => {
      expect(flags.queryByText('Title 3')).toBeInTheDocument()

      act(() => {
        jest.runAllTimers()
      })

      expect(flags.queryByText('Title 3')).toBeInTheDocument()
    })
  })
})
