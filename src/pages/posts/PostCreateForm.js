import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Alert } from "react-bootstrap";

function PostCreateForm() {
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

  // handleChange function
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  // handleChangeImage function
  const handleChangeImage = (event) => {
    const selectedFile = event.target.files.length;
    if (selectedFile) {
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

  formData.append('title', title);
  formData.append('content', content);
  formData.append('image', imageInput.current.files[0]);

  try {
    const { data } = await axiosReq.post('/posts/', formData);
    history.push(`/posts/${data.id}`);
  } catch (error) {
    // validate error 
    console.error(error);
    if (error.response?.status !== 401) {
      setErrors(error.response.data.errors);
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
      {errors.title?.map((message, idx) => (
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
      {errors.content?.map((message, idx) => (
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
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
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
              {image ? (
                <>
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
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  {/* ASSET */}
                  <Asset src={Upload} message={"Click or tap to upload"} />
                </Form.Label>
              )}

              {/* Add ref props */}
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {/* Add alert compnt */}
            {errors.image?.map((message, idx) => (
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

export default PostCreateForm;
