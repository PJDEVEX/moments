import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

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

  // Define history variable
  const history = useHistory();

  // Function to handle API call on mount
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log("Error occurred while fetching user data: ", err);
    }
  };

  // Call handleMount on mount
  useEffect(() => {
    handleMount();
  }, []);

  // Attached request interceptor to axiosReq instance
  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        // (5) Check if token refresh is needed
        if (shouldRefreshToken()) {
          try {
            // Refresh access token before sending the request
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            console.log("Error refreshing token:", err);
            // Redirect to SignIn page and reset currentUser
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            // (6) Remove token timestamp on token refresh failure
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // Attach response interceptor to axiosRes instance
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            // (7) Remove token timestamp on token refresh failure
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    // Wrap components with Context Providers
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
