import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        {/* NavLink to the Home page when click logo */}
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45px"></img>
          </Navbar.Brand>
        </NavLink>
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

            {/* Signin NavLink */}
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/singin"
            >
              <i className="fas fa-sign-in-alt"></i>Sign in
            </NavLink>

            {/* Signup NavLink */}
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/singup"
            >
              <i className="fas fa-user-plus"></i>Sign up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
