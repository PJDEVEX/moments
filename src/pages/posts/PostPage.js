import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function PostPage() {
// Use useParams to extract post_id
const {id} = useParams();
// Initializing post and setPost state
const[post, setPost] = useState({results: []});

// Using useEffect and async function to Fetch post data
useEffect(() => {
    const handleMount = async () => {
      try {
        const [{data: post}] = await Promise.all ([
            axiosReq.get(`/posts/${id}`)
        ])
        setPost({ results: [post] });
        console.log('Fetched Post:', post);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    handleMount();
  }, [id]);
  

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <p>Post component</p>
        <Container className={appStyles.Content}>
          Comments
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;