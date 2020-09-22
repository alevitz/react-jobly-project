import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "./UserContext";

function Navigation({ logOut }) {
  const { currentUser } = useContext(UserContext);


  const loggedInNavBar = (
    <ul className="navbar-nav ml-auto inline">
      <li className="nav-item">
        <NavLink className="nav-link" to="/companies">
          Companies
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/jobs">
          Jobs
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/profile">
          Profile
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/" onClick={logOut}>
          Log out
        </NavLink>
      </li>
    </ul>
  )

  const loggedOutNavBar = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink className="nav-link my-2" to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  )



  return (
    <nav className="navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        Jobly
      </Link>
      {currentUser ? loggedInNavBar : loggedOutNavBar}
    </nav>

  )


}

export default Navigation;