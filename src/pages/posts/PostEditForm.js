import React, { useEffect, useRef, useState } from "react";

import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Image,
  Alert,
} from "react-bootstrap";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";

// Modify function name
function PostEditForm() {
  // Create and initialize errors values
  const [errors, setErrors] = useState({});

  // Create and initialize Post Data values
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });

  // Destructure post data
  const { title, content, image } = postData;

  // Create ref to form.file compt using useRef
  const imageInput = useRef(null);

  // Define history variable
  const history = useHistory();

  //   Destructure id
  const { id } = useParams();

  useEffect(() => {
    // Fetch post details on component mount
    const handleMount = async () => {
      try {
        // Fetch post data using the provided ID
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, content, image, is_owner } = data;

        // If the current user is the owner, update the post data
        // If not, redirect to the homepage
        is_owner ? setPostData({ title, image, content }) : history.push("/");
      } catch (err) {
        console.log("handleMountError: ", err);
      }
    };

    // Call the handleMount function when the component mounts
    handleMount();
  }, [id, history]);

  // handleChange function
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  // handleChangeImage function
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // handleSubmit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    // Append the selected image file to the form if exists
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }
    try {
      // change from post to put and add post id for editing
      await axiosReq.put(`/posts/${id}/`, formData);
      // Redirect to the edited post
      history.push(`/posts/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      {/* Add input fields */}
      <Form.Group controlId="postTitle">
        <Form.Label>Title</Form.Label>
        {/* set post data values and on change*/}
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Add alert compnt */}
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="postContent">
        <Form.Label>Content</Form.Label>
        {/* set post data values and onChange */}
        <Form.Control
          as="textarea"
          name="content"
          rows={6}
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {/* Add alert compnt */}
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        // Redirecting back to the lastpage user was on...
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      {/* Update the button */}
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {/* Show the preview of the image if one is chosen */}

              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              {/* Add ref props */}
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {/* Add alert compnt */}
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

// (Modify export
export default PostEditForm;
