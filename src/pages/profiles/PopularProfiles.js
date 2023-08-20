import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css"; 
import Asset from "../../components/Asset"; 
import Profile from "../posts/Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";

// pass mobile param
const PopularProfiles = ({ mobile }) => {
   // ReoveDestructure the profileData object
  //  const { popularProfiles } = profileData;
  const { popularProfiles } = useProfileData();


  return (
    // Conditionally rendering popProfiles and add styling accordingly
    // Pass profile component
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
                <Profile key={profile.id} profile={profile} mobile/>
              ))}
            </div>
          ) : (
            popularProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
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
