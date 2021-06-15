import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import PageTitle from "../components/auth/PageTitle";
import Photo from "../components/feed/Photo";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Home = () => {
  const [offset] = useState(0);
  const { data } = useQuery(FEED_QUERY, {
    variables: {
      offset,
    },
  });
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
};

export default Home;
