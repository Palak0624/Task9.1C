import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

const NavBAR = ({ user, onSignOut }) => {
  return (
    <nav className="navbar">
      <div className="navbar-top">DEV@Deakin</div>
      <input 
        type="text"
        className="navbar-input"
        placeholder="Search"
      />
      <div className="link">
        {user ? (
          <>
            <button className="post" onClick={onSignOut}>Sign Out</button>
            <Link to="/profile">
              <button className="post">Profile</button>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <button className="post">Log In</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBAR;
