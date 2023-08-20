import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css"; // (1) import module
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const PopularProfiles = () => {
  const [profileData, setProfileData] = useState({
    // (4) Will use pageProfile later	
    // Define and initiate values
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });
  //   (5) Destructuring
  const { popularProfiles } = profileData;
  // (7)
  const currentUser = useCurrentUser();

  // (6) Fetching data
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    // (2)
    <Container className={appStyles.Content}>
      {popularProfiles.results.length ? (
        <>
          <p>Most followed profiles.</p>
          {popularProfiles.results.map((profile) => (
            <p key={profile.id}>{profile.owner}</p>
          ))}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;