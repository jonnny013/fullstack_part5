import React from 'react'
import logoPic from '../mainLogo.png'

const Header = (props) => {
  const styles = {
    backgroundColor: 'orange',
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  }
  const logo = {
    width: 100,
    height: 'auto',
    paddingLeft: 50,
  }
  return (
    <div style={styles} >
      <img className='logo' style={logo} src={logoPic} alt='logo' />
      <h1 className='blogTitle'>Blogs</h1>
      <p className='userInfo'>{props.user.name} is logged in. <button id='logout-button' onClick={props.handleLogout}>Logout</button></p>
    </div>
  )
}

export default Header