import React, { createContext, useContext, useState, useEffect } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults"; // Make sure to import axiosReq

// Define contexts for profile data and its setter function
export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

// Custom hooks to access the context values
export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

// Export, define a ProfileDataProvider function and pass children prop
export const ProfileDataProvider = ({ children }) => {
  // Cut and paste stateful logic from PopularProfile.js
  // Define and initiate the state values for profile data
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] }, // Placeholder for page profile data
    popularProfiles: { results: [] }, // Placeholder for popular profiles data
  });

  // Get the current authenticated user from the context
  const currentUser = useCurrentUser();

  // Fetch data from the API when the component mounts or currentUser changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an API request to fetch popular profiles data
        const { data } = await axiosReq.get("/profiles/?ordering=-followers_count");

        // Update the state with the fetched data
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log("Error fetching popularProfile data: ", err);
      }
    };

    // Call the fetchData function to initiate data fetching
    fetchData();
  }, [currentUser]);

  // Provide the profile data and setter function through context
  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
