import React from 'react'
import { render } from '@testing-library/react'
import Flags from 'components/Flags'

describe('Flags', () => {
  it('renders an empty container at the top right corner', () => {
    const flags = render(<Flags />)

    const container = flags.queryByTestId('ap-flags')

    expect(container).toBeEmptyDOMElement()
    expect(container).toHaveStyle({ position: 'fixed', top: '0', right: '30px' })
  })
})
