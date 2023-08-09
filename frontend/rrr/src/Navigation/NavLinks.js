import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact="true">
          {" "}
          Home
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/mybooks`}> My Books</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/myaccount`}> My Account</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/addnewbook"> Add New Book</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login"> Login </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/signup"> Signup </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/about" exact="true">
          {" "}
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contactus" exact="true">
          {" "}
          Contact Us
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Log Out</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
