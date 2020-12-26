import React from 'react'
import { render } from '@testing-library/react'
import Dialogs from 'components/Dialogs'

describe('Dialogs', () => {
  it('renders nothing', () => {
    const dialogs = render(<Dialogs />)

    expect(dialogs.container).toBeEmptyDOMElement()
  })
})
