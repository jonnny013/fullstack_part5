import {React, useState} from 'react'

const CreateBlog = ({handleCreateBlog}) => {
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
                <input type='text' value={title} name='Title' onChange={({target}) => setTitle(target.value)} />
            </div>
            <div>
                Author:
                <input type='text' value={author} name='Author' onChange={({target}) => setAuthor(target.value)} />
            </div>
            <div>
                Url:
                <input type='text' value={url} name='Url' onChange={({target}) => setUrl(target.value)} />
            </div>
            <button type='submit'>Create</button>
        </form>
    </>
  )
}

export default CreateBlog