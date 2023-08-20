import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

// import CommentCreateForm and useCurrentUser
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../components/contexts/CurrentUserContext";
import Comment from "../comments/Comment";

function PostPage() {
  // Use useParams to extract post_id
  const { id } = useParams();
  // Initializing post and setPost state
  const [post, setPost] = useState({ results: [] });

  // Declare currentUser, Profile_image, comments variables
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  // Using useEffect and async function to Fetch post data
  useEffect(() => {
    const handleMount = async () => {
      try {
        // Fetch post and comments data using Promise.all
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        // Set the fetched comments data
        setComments(comments);
        console.log("Fetched Post:", post);
        console.log("Fetched Post:", comments);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        {/* Passing props from PostPage.js */}
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container className={appStyles.Content}>
          {/* Conditionally allow to comment */}
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {/* Render comments */}
          {comments.results.length ? (
            comments.results.map((comment) => (
              <Comment key={comment.id} {...comment} 
              // Passing setPost and setComments as props
              setPost = {setPost}
              setComments = {setComments}
              />
            ))
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;
