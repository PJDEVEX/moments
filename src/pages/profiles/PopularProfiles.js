import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults"; // Import the axios request configuration
import appStyles from "../../App.module.css"; // Import module for styles
import Asset from "../../components/Asset"; // Import the Asset component for displaying spinners
import { useCurrentUser } from "../../contexts/CurrentUserContext"; // Import the user context for authentication

const PopularProfiles = () => {
  // Define and initiate the state values for profile data
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] }, // Placeholder for page profile data
    popularProfiles: { results: [] }, // Placeholder for popular profiles data
  });

  // Destructure the profileData object for easy access
  const { popularProfiles } = profileData;

  // Get the current authenticated user from the context
  const currentUser = useCurrentUser();

  // Fetch data from the API when the component mounts or currentUser changes
  useEffect(() => {
    const handleMount = async () => {
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

    // Call the handleMount function to initiate data fetching
    handleMount();
  }, [currentUser]); // Trigger the effect whenever the currentUser changes

  return (
    // Render the component content
    <Container className={appStyles.Content}>
      {popularProfiles.results.length ? ( // Check if there are popular profiles to display
        <>
          <p>Most followed profiles.</p>
          {popularProfiles.results.map((profile) => (
            <p key={profile.id}>{profile.owner}</p>
          ))}
        </>
      ) : (
        <Asset spinner /> // Display a spinner if no data is available
      )}
    </Container>
  );
};

export default PopularProfiles;
