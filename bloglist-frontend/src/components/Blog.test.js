import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'A suitable title',
      author: 'test',
      likes: 5,
      url: 'google.com',
      user: {
        name: 'test',
      }
    }
    const user = {
      name: 'jon'
    }
    container = render(
      <Blog blog={blog} user={user} />
    ).container
  })
  test('title and author are displayed at start', async () => {
    await screen.findAllByText('A suitable title - test')
  })
  test('likes and url are hidden', async () => {
    const div = container.querySelector('.blogFullInfoDisplay')
    expect(div).toHaveStyle('display: none')
  })
})
