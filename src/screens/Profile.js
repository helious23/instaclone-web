import { useParams } from "react-router";

const Profile = () => {
  const { username } = useParams();
  console.log(username);
  return "Profile";
};

export default Profile;
