import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults"; // Import the axios request configuration
import appStyles from "../../App.module.css"; // Import module for styles
import Asset from "../../components/Asset"; // Import the Asset component for displaying spinners
import { useCurrentUser } from "../../contexts/CurrentUserContext"; // Import the user context for authentication

// (2) pass mobile param
const PopularProfiles = ({ mobile }) => {
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

    // Call the handleMount function to initiate data fetching
    handleMount();
  }, [currentUser]); // Trigger the effect whenever the currentUser changes

  return (
    <Container className={`${appStyles.Content} ${
      mobile && "d-lg-none text-center mb-3"
    }`}
  >
      {popularProfiles.results.length ? (
        <>
          <p>Most followed profiles.</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <p key={profile.id}>{profile.owner}</p>
              ))}
            </div>
          ) : (
            popularProfiles.results.map((profile) => (
              <p key={profile.id}>{profile.owner}</p>
            ))
          )}
        </>
      ) : (
        <Asset spinner={true} /> 
      )}
    </Container>
  );
};

export default PopularProfiles;
