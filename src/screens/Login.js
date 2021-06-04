import { useMutation } from "@apollo/client";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/auth/PageTitle";
import Seperator from "../components/auth/Seperator";
import { Title } from "../components/shared";
import routes from "../routes";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Form = styled.form`
  margin-top: 35px;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    # 변수가 있을 경우 $변수명:타입
    login(username: $username, password: $password) {
      # 변수 지정
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    // register : name, required, validation
    // handleSubmit : form 에 적용 handleSubmit(onValidFn, inValidFn)
    mode: "onChange", // input 창이 변할때 마다 ex)onBlur : unfocus
  });
  const onCompleted = (data) => {
    const {
      login: { ok, error, token }, // backend 에서 가져온 data
    } = data;
    if (!ok) {
      return setError("result", {
        // error 의 이름
        message: error, // error message
      });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    // mutation login 함수로 담음 : mutation trigger fn
    onCompleted,
  });
  const onSubmitValid = (data) => {
    // valid 일 때 cb 함수
    if (loading) {
      return;
    }
    const { username, password } = getValues(); // form 값을 변수로 가져옴
    login({
      variables: { username, password }, //getValues 로 가져온 변수를 login 에 변수로 담아서 실행
    });
  };

  const clearLoginError = () => {
    if (formState.errors.result) clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <Title>Pharmstagram</Title>
        </div>
        <Form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "Username is required",
            })}
            onFocus={clearLoginError}
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
            onFocus={clearLoginError}
            type="password"
            placeholder="Password"
            hasError={Boolean(formState?.errors?.password?.message)}
          />
          <FormError message={formState?.errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
        </Form>
        <FormError message={formState?.errors?.result?.message} />
        <Seperator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
};

export default Login;
