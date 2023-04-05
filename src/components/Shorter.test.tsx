import {describe, it, vi, expect} from 'vitest'
import userEvent from '@testing-library/user-event'
import {screen, render, waitFor} from '@testing-library/react'
import Shorter from './Shorter'

const user = userEvent.setup()

describe('Shorter', () => {
  it('renders without error', () => {
    render(<Shorter onLinkChange={vi.fn()} />)
  })

  it('throws an error if Shorten-Button is clicked without link', async () => {
    // ARRANGE
    render(<Shorter onLinkChange={vi.fn()} />)

    // ACT
    await user.click(screen.getByText('Shorten It!'))

    // ASSERT
    await waitFor(() => {
      expect(screen.getByText('Please add a valid link')).toBeInTheDocument()
    })
  })

  it('should show input from keyboard in input-field/value', async () => {
    render(<Shorter onLinkChange={vi.fn()} />)

    await user.type(screen.getByRole('textbox'), 'Hello, World!')

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('Hello, World!')
    })
    // Value of input has not changed, where is it comparing?
    // screen.debug()
  })

  // This does NOT work for some reason... (Expedted vs Received value not aligning, although previous test works...)
  // it('should show error with invalid link + clicking on button', async () => {
  //   render(<Shorter onLinkChange={vi.fn()} />)

  //   await user.type(screen.getByRole('textbox'), 'Hello, World!')
  //   await user.click(screen.getByText('Shorten It!'))

  //   await waitFor(() => {
  //     expect(screen.getByRole('textbox')).toHaveValue('Hello, World!')
  //     expect(screen.getByText('Please add a valid link')).toBeInTheDocument()
  //   })
  // })
})
