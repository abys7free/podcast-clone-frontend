import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";
import nuberLogo from "../images/logo.svg"
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroadcastTower } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/button";


const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput){
      ok
      token
      error
    }
  }
`


interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, getValues, errors, handleSubmit, formState } = useForm<ILoginForm>({
    mode: "onChange"
  });
  const onCompleted = (data: loginMutation) => {
    const { login: { error, ok, token } } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token)
      authTokenVar(token);
      isLoggedInVar(true);
    }
  }

  const [loginMutation, { loading, error, data: loginMutationResult }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          }
        }
      })
    }
  };
  return (
    <div className="h-screen flex flex-col items-center lg:mt-28">
      <Helmet>
        <title>Login | Podcast</title>
      </Helmet>
      <div className='w-full mt-10 max-w-screen-sm flex flex-col px-5 items-center'>
        <div className="w-full flex items-center">
          <FontAwesomeIcon icon={faBroadcastTower
          } className="text-4xl text-white" />
          <h4 className='font-medium text-3xl ml-4 text-white'>Show yourself!</h4>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            ref={register({
              required: "Email is required", pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })}
            name="email"
            required
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"} />
          )}
          <input
            ref={register({ required: "Password is required" })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          <Button canClick={formState.isValid} loading={loading} actionText={"Log in"} />
          {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult.login.error} />}
        </form>
        <div className=" font-medium text-gray-300">
          New to Podcast? <Link to='/create-account' className=" text-yellow-500 hover:underline">Create an Account</Link>
        </div>
      </div>
    </div>
  );
};