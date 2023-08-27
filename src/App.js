import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";

function App() {
  // Using useCurrentUser to Get User Details
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        {/* Use the Switch component to handle routing */}
        <Switch>
          {/* Route for the pages */}
          {/* Add PostsPage as Home page */}
          <Route
            path="/"
            exact
            render={() => (
              <PostsPage message="No results found. Adjust the keyword" />
            )}
          />
          {/* Set up feed route */}
          <Route
            path="/feed"
            exact
            render={() => (
              <PostsPage
                message="No results found. Follow a user"
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          {/* Set up Like route */}
          <Route
            path="/liked"
            exact
            render={() => (
              <PostsPage message="No results found. Adjsut the keyword or Like a post" />
            )}
            filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
          />

          <Route path="/signin" exact render={() => <SignInForm />} />
          <Route path="/signup" exact render={() => <SignUpForm />} />
          <Route path="/posts/create" exact render={() => <PostCreateForm />} />
          <Route path="/posts/:id" exact render={() => <PostPage />} />
          <Route path="/posts/:id/edit" exact render={() => <PostEditForm />} />
          <Route path="/profiles/:id" exact render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />

          {/* Route for page not found */}
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
