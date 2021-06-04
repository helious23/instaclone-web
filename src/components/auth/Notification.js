import styled from "styled-components";

const SNotification = styled.span`
  color: #2ecc71;
  font-weight: 500;
  font-size: 14px;
  margin-top: 15px;
  font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Notification = ({ message }) => {
  return message === "" || !message ? null : (
    <SNotification>{message}</SNotification>
  );
};

export default Notification;
