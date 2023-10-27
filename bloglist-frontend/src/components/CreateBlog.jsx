import { React, useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const makeBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    handleCreateBlog(blogObject)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={makeBlog}>
        <div>
                Title:
          <input type='text' value={title} name='Title' placeholder='Choose a title' onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
                Author:
          <input type='text' value={author} name='Author' placeholder="Author's name" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
                Url:
          <input type='text' value={url} name='Url'  placeholder='Add a Url to see the whole blog' onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>Create</button>
      </form>
    </>
  )
}

CreateBlog.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired
}

export default CreateBlog