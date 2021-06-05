import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  console.log(data, error);
  return "";
};

export default useUser;
