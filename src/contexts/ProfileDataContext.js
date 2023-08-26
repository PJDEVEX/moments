import React, { createContext, useContext, useState, useEffect } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq, axiosRes } from "../api/axiosDefaults"; // Make sure to import axiosReq
import { followHelper, unfollowHelper } from "../utils/utils";

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

  // handleFollow Function
  const handleFollow = async (clickedProfile) => {
    try {
      // Send a POST request to the '/followers/' endpoint with,
      // the ID of the clicked profile
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });
      // Add a call back function for updating following and followed count
      setProfileData((prevState) => ({
        ...prevState,
        // Add same ternary condtion to pageProfile too
        // use helper function while passing 3 props, profile,
        // clickedProfile, data.id)
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        // Add ternary to popularProfile
        // use helper function)
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
      // Handle successful follow action
    } catch (err) {
      // Handle errors that occur during the follow action
      console.log("Error occurred while trying to follow:", err);
    }
  };

  // handleUnfollow function
  const handleUnfollow = async (clickedProfile) => {
    try {
      //API call to unfollow profile using DELETE
      await axiosRes.delete(
        `/followers/${clickedProfile.following_id}/`
      );
      // Update profile data after successful unfollow action
      // Update 'pageProfile' and 'popularProfiles',
      // by mapping through the results
      setProfileData((prevState) => ({
        ...prevState,
        
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      // handleUnfollow error
      console.log("handleUnfollow error: ", err);
    }
  };

  // Fetch data from the API when the component mounts or currentUser changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make an API request to fetch popular profiles data
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );

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
      {/* Provide functions to child components*/}
      {/* provide hadndleUnfollow */}
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
