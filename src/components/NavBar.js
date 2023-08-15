import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "./contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";

const NavBar = () => {
  // Access currentUser
  // const currentUser = useContext(CurrentUserContext);

  // Access use CurrentUser
  // Modify the const currentUser = useContext(CurrentUserContext);
  // to auto import useCurrentUser custom hook
  const currentUser = useCurrentUser();

  // (7) Use the hook
  const setCurrentUser = useSetCurrentUser();

  // (8) Define signout function
  const handleSignOut = async () => {
    try {
      // Make a POST request to the logout endpoint
      await axios.post('dj_rest_auth/logout');
      // Reset currentUser to null
      setCurrentUser(null);
      // Handle errors
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // (1) Define add post function
  const addPostIcon = (
    <NavLink
      className={styles.IconLink}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="far fa-plus-square"></i> Add post
    </NavLink>
  );

  // logged in user icon
  const loggedInIcons = (
    <>
      {/* (3) Remove user name and add feed, liked post etc...  */}
      {/* {currentUser?.username} */}

      {/* (3.1) Feed */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>

      {/* (3.2) Liked */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>

      {/* (3.3) Signout */}
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Signout
      </NavLink>

      {/* (3.4) Profile of the signed in user */}
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
        onClick={() => {}}
      >
        {/* (6) Remove image tag and include Avatar compnt */}
        {/* <img src={currentUser?.profile_image} alt="Profile" /> */}
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );
  // console.log(currentUser?.profile_id);

  // icons that logged out user can see
  const loggedOutIcons = (
    <>
      {/* Signin NavLink */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      {/* Signup NavLink */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        {/* NavLink to the Home page when click logo */}
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45px"></img>
          </Navbar.Brand>
        </NavLink>

        {/* (2) Add post */}
        {currentUser && addPostIcon}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            {/* Home NavLink */}
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
              exact
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
