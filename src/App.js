import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { useState, useEffect, createContext } from "react";
import axios from "axios";

// Create CurrentUserContext and SetCurrentUserContext
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  // Create currentUser state
  const [currentUser, setCurrentUser] = useState(null);

  // Define handleMount function to check user login in
  const handleMount = async () => {
    try {
      const response = await axios.get("/dj-rest-auth/user/");
      const { data } = response;
      setCurrentUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Use useEffect to call handleMount on mount
  useEffect(() => {
    handleMount();
  }, []);

  return (
    // Wrap components with Context Providers
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            {/* Use the Switch component to handle routing */}
            <Switch>
              {/* Route for the pages */}
              <Route path="/" exact render={() => <h1>Home Page</h1>} />
              <Route path="/signin" exact render={() => <SignInForm />} />
              <Route path="/signup" exact render={() => <SignUpForm />} />
              {/* Route for page not found */}
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
