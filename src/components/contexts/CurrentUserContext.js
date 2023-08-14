import { useState, useEffect, createContext, useContext, useMemo } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

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

  // (4) Define history variable
  const history = useHistory();

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

  // (4) Attached request interceptor to axiosReq instance
  useMemo (() => {
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        try {
          // (5) Refresh access token before sending the request
          await axios.post('dj-rest-auth/token/refresh/')
        } catch (error) {
          // Redirect to SignIn page and reset currentUser
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push('/signin');
            }
            return null;
          });
          return config;
        }
      },
      (error) => Promise.reject(error)
    );
    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
    };
  }, [history]);



  // (2) Attach response interceptor to axiosRes instance
  useMemo(() => {
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            // (3) Refresh access token logic
            await axios.post('dj/rest-auth/token/refresh/')
          } catch(err) {
            setCurrentUser(prevCurrentUser => {
              if (prevCurrentUser) {
                history.push('/signin');
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err )
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
