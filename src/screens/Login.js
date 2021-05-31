import { darkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const Container = styled.div``;

const Login = () => {
  return (
    <Container>
      <Title>Login</Title>
      <button onClick={() => darkModeVar(true)}>To Dark</button>
      <button onClick={() => darkModeVar(false)}>To light</button>
      <button onClick={() => isLoggedInVar(true)}>Log in</button>
    </Container>
  );
};

export default Login;
