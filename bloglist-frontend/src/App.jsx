import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [errorMessage, setErrorMessage] = useState(null)
  const [styling, setStyling] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user) 
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const errormessagefunction = (message, style) => {
    setErrorMessage(message)
    if (style === 'green') {
      setStyling('style1')
    } else {
      setStyling('style2')
    }
    setTimeout(() => {
      setStyling(null)
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      errormessagefunction(`Welcome ${user.name}`, 'green')
    } catch (exception) {
      errormessagefunction('wrong username or password', 'red')
    }
  }
  
  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
    errormessagefunction('User logged out', 'green')
  }

  const handleCreateBlog = async (blogObject) => {
    try {const response = await blogService.create(blogObject)
          blogService.getAll().then(blogs => setBlogs( blogs ))  
          errormessagefunction(`New blog ${blogObject.title} by ${blogObject.author} added`, 'green')
        } catch (exception) {
      errormessagefunction(`Post unsuccesful: ${exception.response.data.error}`, 'red')
    }  
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>Log In</h1>
      <div>
        Username:
        <input type='text' value={username} name='Username' onChange={({target}) => setUsername(target.value)} />
      </div>
      <div>
        Password:
        <input type='text' value={password} name='Password' onChange={({target}) => setPassword(target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const handleLike = async (blog) => {
    event.preventDefault()
    await blogService.addLike(blog)
    blogService.getAll().then(blogs => setBlogs( blogs ))  
    errormessagefunction("Blog liked!", 'green')
  }

  const handleDelete = async (blog) => {
    event.preventDefault()
    if (window.confirm(`Would you like to delete the blog: ${blog.title}?`)){
    try {
      window.confirm
      await blogService.deleteBlog(blog)
      blogService.getAll().then(blogs => setBlogs( blogs ))
      errormessagefunction("Blog deleted", 'green')
    } catch(exception) {
      errormessagefunction(`Unable to delete: ${exception.response.data.error}`, 'red')
    } }
  }

  if (!user) {
    return (
      <div>
      {errorMessage && <Notification message={errorMessage} styling={styling} />}
      {loginForm()}
      </div>
    )
  }

  

  return (
    <div>
      <h2>Blogs</h2>
      {errorMessage && <Notification message={errorMessage} styling={styling} />}
      <p>{user.name} is logged in. <button onClick={handleLogout}>Logout</button></p>
      <Togglable buttonLabel='Create New Blog'>
        <CreateBlog handleCreateBlog={handleCreateBlog} />
      </Togglable>
      
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user} />
      )}
    </div>
  )
}

export default App