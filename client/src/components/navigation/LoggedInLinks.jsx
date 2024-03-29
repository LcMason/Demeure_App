
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../actions/users'


const LoggedInLinks = () => {
  const { currentUser, cartCount } = useSelector(store => store.usersReducer)
  const dispatch = useDispatch();

  const handleLogout = () => {
    fetch('/logout', {method: "DELETE"});
    dispatch(logoutUser())
  }  

return (
  <div className="collapse navbar-collapse" id="navbarColor03">
    <ul className="navbar-nav me-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/about">About</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/products">Shop</Link>
      </li>
      {/* <li className="nav-item">
        <Link className="nav-link" to="reviews">Reviews</Link>
      </li> */}
      <li className="nav-item">
        <Link className="nav-link" to="/login" onClick={handleLogout}>Logout</Link>
      </li>
        <Link className="nav-link me-3" to="/checkout">
        <i className="bi bi-cart"></i>           
          <span className="badge rounded-pill badge-notification bg-danger">{isNaN(cartCount) ? null : cartCount}</span>
        </Link>
    </ul>
    <span className="text-light">Welcome {currentUser.username}</span>
 
    {/* Nicholas : I want my breadcrumbs to be in a div on the page, under the Welcome (currentUsername.username) but keep getting syntax errors */}
    
  </div>
  )
}

export default LoggedInLinks
