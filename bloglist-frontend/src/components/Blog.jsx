import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
  }
  const paragraphStyle = {
    margin: 2,
  }

    const [visible, setVisible] =useState(false)
    const showWhenVisible = {display: visible ? '' : 'none'}
    
    const toggleVisibility = () => {
        setVisible(!visible)
    }
    const viewHideButton = visible ? "Hide" : "View"
  return(
  <div style={blogStyle}>
    <div>
    <p style={paragraphStyle}>{blog.title} - {blog.author} <button onClick={toggleVisibility}>{viewHideButton}</button></p>
    </div>
    <div style={showWhenVisible}>
      <p style={paragraphStyle}>{blog.url}</p>
      <p style={paragraphStyle}>Likes: {blog.likes} <button onClick={() => handleLike(blog)}>Like</button></p>
      <p style={paragraphStyle}>{blog.user.name}</p>
    </div>
  </div>  
)}

export default Blog