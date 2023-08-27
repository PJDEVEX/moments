import React, { useState } from "react";

import {
  Form,
  Alert,
  Button,
  Col,
  Row,
  Image,
  Container,
} from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";

import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";

function SignInForm() {
  // Access currentUser and setCurrentUser
  // const setCurrentUser = useContext(SetCurrentUserContext);

  // Access useSetCurrentUser custom hook
  // Modify the const setCurrentUser = useContext(SetCurrentUserContext);
  // to auto import useSetCurrentUser custom hook
  const setCurrentUser = useSetCurrentUser();
  // (2) calling useRedirect string value
  useRedirect("loggedIn");

  // Initialize signInData
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  // Destructure signInData
  const { username, password } = signInData;

  // error handling with useState for errors
  const [errors, setErrors] = useState({});

  // useHistory to redirect
  const history = useHistory();

  // handleSubmit async function
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // API call to signin user
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      // Update currentUser in SignInForm.js after successful sign
      setCurrentUser(data.user);
      // (4) set the Timestamp value
      setTokenTimestamp(data);
      // Redirect to "/" homepage on successful registration
      // history.push("/");
      // Redirect user to homepage on successful sign in
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  // handleChange function
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign in</h1>

          {/* Signin form */}

          <Form onSubmit={handleSubmit}>
            <Form.Group className={styles.Input} controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group className={styles.Input} controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign in
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero.jpg"}
        />
      </Col>
    </Row>
  );
}

export default SignInForm;
