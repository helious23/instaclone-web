import { useMutation } from "@apollo/client";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/auth/PageTitle";
import Seperator from "../components/auth/Seperator";
import { FatLink, Title } from "../components/shared";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;

const FacebookLogin = styled(Link)`
  margin-top: 20px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 6px 0px;
  font-weight: 600;
  width: 100%;
  font-size: 15px;
  display: flex;
  justify-content: center;
  padding: 8px 0px;
  span {
    margin-left: 5px;
  }
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory(); // redirect api
  const { register, handleSubmit, formState, setError, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    createAccount({
      variables: { ...data },
    });
  };

  const onCompleted = (data) => {
    const { username, password } = getValues(); // history 로 보내기 위해 가져옴
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    history.push(routes.home, {
      message: "Account created. Plaese log in.",
      username,
      password,
    }); // state 로 obj 를 보낼 수 있음
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <Title>Pharmstagram</Title>
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <FacebookLogin to={"/"}>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span> Log in with Facebook</span>
        </FacebookLogin>
        <Seperator />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", {
              required: "First Name is required",
            })}
            type="text"
            placeholder="First Name"
            hasError={Boolean(formState?.errors?.firstName?.message)}
          />
          <FormError message={formState?.errors?.firstName?.message} />
          <Input
            {...register("lastName")}
            type="text"
            placeholder="Last Name"
            hasError={Boolean(formState?.errors?.lastName?.message)}
          />
          <FormError message={formState?.errors?.lastName?.message} />
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email is invalid",
              },
            })}
            type="email"
            placeholder="Email"
            hasError={Boolean(formState?.errors?.email?.message)}
          />
          <FormError message={formState?.errors?.email?.message} />
          <Input
            {...register("username", {
              required: "Username is required",
            })}
            type="text"
            placeholder="Username"
            hasError={Boolean(formState?.errors?.username?.message)}
          />
          <FormError message={formState?.errors?.username?.message} />
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should be longer than 6 Char.",
              },
            })}
            type="password"
            placeholder="Password"
            hasError={Boolean(formState?.errors?.password?.message)}
          />
          <FormError message={formState?.errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign Up"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={formState?.errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
};

export default SignUp;
