import React from 'react'
import { Link } from 'react-router-dom'
import LoggedInLinks from './LoggedInLinks'
import LoggedOutLinks from './LoggedOutLinks'
import { useSelector } from 'react-redux'


const Navbar = ({cartCount, setCartCount}) => {
  const { loggedIn } = useSelector(store => store.usersReducer)
//   return(
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//   <div className="container-fluid padding-5">
//     <Link className="navbar-brand" to="/">DEMEURE</Link>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
// {loggedIn ? <LoggedInLinks cartCount={cartCount} setCartCount={setCartCount} /> :<LoggedOutLinks/>}
//   </div>
// </nav>
return(
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid padding-5">
      <Link className="navbar-brand" to="/">DEMEURE</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {loggedIn ? <LoggedInLinks cartCount={cartCount} setCartCount={setCartCount} /> :<LoggedOutLinks/>}
    </div>
  </nav>
  )
}

export default Navbar