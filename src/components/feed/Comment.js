import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

// const EDIT_COMMENT_MUTATION = gql`
//   mutation editComment($id: Int!, $payload: String!) {
//     editComment(id: $id, payload: $payload) {
//       ok
//     }
//   }
// `;

const CommentContainer = styled.div`
  margin-bottom: 7px;
  display: flex;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CaptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const EditButton = styled.button`
  all: unset;
  font-size: 10px;
  opacity: 0.3;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const DeleteButton = styled.button`
  all: unset;
  font-size: 10px;
  opacity: 0.3;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const Comment = ({ id, photoId, author, payload, isMine }) => {
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };

  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };

  return (
    <CommentContainer>
      <Link to={`/users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <CaptionContainer>
        <CommentCaption>
          {payload.split(" ").map((word, index) =>
            /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/.test(word) ? (
              <React.Fragment key={index}>
                <Link to={`/hashtag/${word}`}>{word}</Link>{" "}
              </React.Fragment>
            ) : (
              <React.Fragment key={index}>{word} </React.Fragment>
            )
          )}
        </CommentCaption>

        {isMine ? (
          <ButtonContainer>
            <EditButton onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faPen} />
            </EditButton>
            <DeleteButton onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </DeleteButton>
          </ButtonContainer>
        ) : null}
      </CaptionContainer>
    </CommentContainer>
  );
};

Comment.propTypes = {
  id: PropTypes.number,
  isMine: PropTypes.bool,
  photoId: PropTypes.number,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};
export default Comment;
