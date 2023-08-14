import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";

function App() {

  return (
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
  );
}

export default App;
