import React, { useEffect, useState } from "react";

import { Form, Col, Row, Container } from "react-bootstrap";
import Post from "./Post";
import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// Destructure the message and filter  and initiate to empty string
function PostsPage({ message, filter = "" }) {
  // Initialize state for posts
  const [posts, setPosts] = useState({ results: [] });
  // Initialize state to track whether the posts have loaded
  const [hasLoaded, setHasLoaded] = useState(false);
  // Access the current pathname from the location object
  const { pathname } = useLocation();
  //   Initialize state for search query
  const [query, setQuery] = useState("");
  // Call useCurrentUser and initiate
  const CurrentUser = useCurrentUser();

  // (Fetching Posts Based on Filter
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`); // (4) Fetch posts with the given filter and search query
        // Update the 'posts' state with the fetched data
        setPosts(data);
        // Set the flag to indicate that posts have loaded
        setHasLoaded(true);
      } catch (err) {
        // Bug print
        // console.log(err);
      }
    }; // Reset the 'hasLoaded' state to indicate data is not yet loaded
    setHasLoaded(false);

    // Fetch posts using the 'fetchPosts' function
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };

    // useEffect hook with dependencies 'filter' and 'pathname', query,
    // this will trigger the effect whenever filter or pathname changes
  }, [filter, query, pathname, CurrentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* (1) popProfile for mobile */}
        <PopularProfiles mobile />
        {/* Add search bar */}
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        {/* Create a form for the search bar */}
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          {/* Input field for searching */}
          <Form.Control
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
            // Bind input value to 'query' state
            value={query}
            // Update 'query' state on input change
            onChange={(event) => setQuery(event.target.value)}
          ></Form.Control>
        </Form>
        {/* List of posts contextually */}
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              // Importing InfiniteScroll and Using it
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              ></InfiniteScroll>
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
        {/* append most pop profiles */}
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostsPage;
