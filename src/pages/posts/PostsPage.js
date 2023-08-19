import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Post from "./Post"; 
import NoResults from "../../assets/no-results.png"; 
import Asset from "../../components/Asset"; 

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults.js"; 

// Destructure the message and filter  and initiate to empty string
function PostsPage(message, filter = "") {
  // Initialize state for posts
  const [posts, setPosts] = useState({ results: [] });
  // Initialize state to track whether the posts have loaded
  const [hasLoaded, setHasLoaded] = useState(false);
  // Access the current pathname from the location object
  const { pathname } = useLocation();

  // Fetching Posts Based on Filter
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}`);
        // Update the 'posts' state with the fetched data
        setPosts(data);
        // Set the flag to indicate that posts have loaded
        setHasLoaded(true);
      } catch (err) {
        // Bug print
        console.log(err);
      }
    }; // Reset the 'hasLoaded' state to indicate data is not yet loaded
    setHasLoaded(false);

    // Fetch posts using the 'fetchPosts' function
    fetchPosts();

    // useEffect hook with dependencies 'filter' and 'pathname',
    // this will trigger the effect whenever filter or pathname changes
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        {/* List of posts contextually */}
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              posts.results.map((post) => (
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default PostsPage;
