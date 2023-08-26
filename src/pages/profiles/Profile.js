import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom"; // Import for creating links
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  // Destructure the props
  const { profile, mobile, imageSize = 55 } = props;

  // Destructure profile object
  const { id, following_id, image, owner } = profile;

  // Get the current authenticated user from the context
  const currentUser = useCurrentUser();

  // Check if the current user is the owner of this profile
  const is_owner = currentUser?.username === owner;

  // Destructure handle follow function
  // (1.3.4) Detructure handleUnfollow function
  const {handleFollow, handleUnfollow} = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      {/* Display the profile image */}
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          {/* Use the Avatar component with the provided image */}
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      {/* Display the profile owner's username */}
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      {/* Display follow/unfollow button */}
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {/* Check if the user is not on mobile, logged in, and not the profile owner */}
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
            // Display "unfollow" button if the user is already following the profile
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              // (1.3.5) call handleUnfollow func when unfollow btn is clicked
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            // Display "follow" button if the user is not following the profile
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              // handleFollow' function when 'follow' button is clicked
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
