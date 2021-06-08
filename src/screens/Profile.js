import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "react-router";
import { PHOTO_FRAGMENT } from "../fragments";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      username
      bio
      avatar
      photos(page: 1) {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Profile = () => {
  const { username } = useParams();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });
  console.log(data);

  return "Profile";
};

export default Profile;
