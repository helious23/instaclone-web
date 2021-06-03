import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
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

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmitValid = (data) => {
    console.log(data);
  };
  const onSubmitInvalid = (data) => {
    console.log(data, "invalid");
  };
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <Title>Pharmstagram</Title>
        </div>
        <Form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: 5,
              validate: (currentValue) => currentValue.includes("potato"),
            })}
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: 8,
            })}
            type="password"
            placeholder="Password"
          />
          <Button type="submit" value="Log in" />
        </Form>
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
