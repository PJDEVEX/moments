import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

// Create CurrentUserContext and SetCurrentUserContext
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Custom hooks to access context values
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// CurrentUserProvider component
export const CurrentUserProvider = ({ children }) => {
  // Define state variables for current user and its setter
  const [currentUser, setCurrentUser] = useState(null);
  // Function to handle API call on mount
  const handleMount = async () => {
    try {
      const response = await axios.get("/dj-rest-auth/user/");
      const { data } = response;
      setCurrentUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Call handleMount on mount
  useEffect(() => {
    handleMount();
  }, []);

  return (
    // Wrap components with Context Providers
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
