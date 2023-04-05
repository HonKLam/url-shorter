import {describe, it, expect} from 'vitest'
import userEvent from '@testing-library/user-event'
import {screen, render} from '@testing-library/react'
import Links from './Links'

const user = userEvent.setup()

const dummyOriginalLinks = ['https://testing-library.com/', 'https://www.youtube.com/watch?v=-Aza7cho7_Y']
const dummyLinks = ['shrtco.de/yBrLU2', 'shrtco.de/zYSnhl']

describe('Links', () => {
  it('renders correctly without links', () => {
    render(<Links links={[]} originalLinks={[]} />)

    expect(screen.getByText('Short-Links will appear here')).toBeInTheDocument()
  })

  it('renders correctly with links and copy button', () => {
    render(<Links links={dummyLinks} originalLinks={dummyOriginalLinks} />)

    expect(screen.getByText('https://testing-library.com/')).toBeInTheDocument()
    expect(screen.getAllByRole('button')[0]).toHaveTextContent('Copy')
  })
})
