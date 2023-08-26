import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    console.log(err);
  }
};

// followHelper Function
// This function updates profile data when a user follows a profile or,
// when the logged-in user's profile interacts with others.
// It increments followers/following counts and,
// sets following_id appropriately.
export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? // This is the profile id I clicked on,
      // Update its followers count and set its following id
      {
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
      }
    : profile.is_owner
    ? // This is the profile of the logged in user
      // Update ist following count
      {
        ...profile,
        following_count: profile.following_count + 1,
      }
    : // this ins not the profile that a user clicked on or
      // the own profile, so return unchanged
      profile;
};

// unfollowHelper
export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? // This is the profile id I clicked on,
      // Update its followers count and set its following id
      {
        ...profile,
        followers_count: profile.followers_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ? // This is the profile of the logged in user
      // Update ist following count
      {
        ...profile,
        following_count: profile.following_count - 1,
      }
    : // this ins not the profile that a user clicked on or
      // the own profile, so return unchanged
      profile;
};
