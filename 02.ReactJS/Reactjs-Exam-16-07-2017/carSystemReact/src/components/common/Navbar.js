import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../users/Auth'
import userStore from '../../stores/UserStore'
class Navbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: Auth.getUser().name
    }
    this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this)
    userStore.on(userStore.eventTypes.USER_LOGGED_IN,
    this.handleUserLoggedIn)
  }
  handleUserLoggedIn (data) {
    if (data.success) {
      this.setState({
        username: data.user.name
      })
    }
  }
  render () {
    return (
      <div className='menu'>
        {Auth.isUserAuthenticated() ? (
          <div>
            <Link to='/'>Home</Link>
            <Link to='/cars/all'>All Cars</Link>
            <Link to='/cars/create'>Add</Link>
            <span>{this.state.username}</span>
            <Link to='/cars/mine'>Profile</Link>
            <Link to='/users/logout'>Logout</Link>
          </div>
    ) : (
      <div>
        <Link to='/'>Home</Link>
        <Link to='/cars/all'>All Cars</Link>
        <Link to='/users/register'>Register</Link>
        <Link to='/users/login'>Login</Link>
      </div>
    )}
      </div>
    )
  }
}

export default Navbar
