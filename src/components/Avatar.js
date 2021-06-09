import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const SAvatar = styled.div`
  width: ${(props) => (props.lg ? "30px" : "20px")};
  height: ${(props) => (props.lg ? "30px" : "20px")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = ({ url = null, lg = false }) => {
  return (
    <SAvatar lg={lg}>
      {url !== null ? (
        <Img src={url} alt={"avatar"} />
      ) : (
        <FontAwesomeIcon icon={faUser} />
      )}
    </SAvatar>
  );
};

export default Avatar;
