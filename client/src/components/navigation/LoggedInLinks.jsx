
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

  console.log("cart Count", cartCount)

return (
  <div className="collapse navbar-collapse" id="navbarColor03">
    <ul className="navbar-nav me-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/about">About</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/items">Shop</Link>
      </li>
      {/* <li className="nav-item">
        <Link className="nav-link" to="reviews">Reviews</Link>
      </li> */}
      <li className="nav-item">
        <Link className="nav-link" to="/login" onClick={handleLogout}>Logout</Link>
      </li>
        <Link className="nav-link me-3" to="/checkout">
        <i className="bi bi-cart"></i>           
          {/* <span className="badge rounded-pill badge-notification bg-danger">{cartCount}</span> */}
          <span className="badge rounded-pill badge-notification bg-danger">{isNaN(cartCount) ? null : cartCount}</span>
        </Link>
    </ul>
    <span className="text-light">Welcome {currentUser.username}</span>
  </div>
  )
}

export default LoggedInLinks
