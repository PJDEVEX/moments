import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
  // Initialize signUpData
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  // Destructure data
  const { username, password1, password2 } = signUpData;

  // Implement error handling with useState for errors
  const [errors, setErrors] = useState({});

  // Use useHistory to redirect
  const history = useHistory();

  // handleChange function
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  // handleSubmit async function
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // API call to register user
      await axios.post('dj/rest-auth/registration/', signUpData);
      // Redirect to /signin on successful registration
      history.push('/signin');
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          {/* form */}

          <Form onSubmit={handleSubmit}>
            {/* Username */}
            <Form.Group className={styles.Input} controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => 
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            )}
            {/* Password */}
            <Form.Group className={styles.Input} controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => 
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            )}

            {/* Confirm Password */}
            <Form.Group className={styles.Input} controlId="password2">
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => 
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            )}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Signup
            </Button>
          </Form>
          {errors.non_field_errors?.map((message, idx) => 
              <Alert variant="warning" key={idx} className="mt-3">
                {message}
              </Alert>
            )}
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"}
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
