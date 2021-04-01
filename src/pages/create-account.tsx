import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import nuberLogo from "../images/logo.svg"
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { UserRole } from "../__generated__/globalTypes";
import { createAccountMutation, createAccountMutationVariables } from "../__generated__/createAccountMutation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroadcastTower } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/button";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput){
      ok
      error
    }
  }
`


interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const { register, getValues, watch, errors, handleSubmit, formState } = useForm<ICreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Listener,
    }
  });
  const history = useHistory()
  const onCompleted = (data: createAccountMutation) => {
    const { createAccount: { ok, error } } = data;
    if (ok) {
      alert("Account Created! Log in now!")
      history.push('/')
    }
  }
  const [createAccountMutation, { loading, data: createAccountMutationResult }] = useMutation<createAccountMutation, createAccountMutationVariables>(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: {
            email,
            password,
            role,
          }
        }
      })
    }
  };
  return (
    <div className="h-screen flex flex-col items-center lg:mt-28">
      <Helmet>
        <title>Create Account | Podcast</title>
      </Helmet>
      <div className='w-full mt-10 max-w-screen-sm flex flex-col px-5 items-center'>
        <div className="w-full flex items-center">
          <FontAwesomeIcon icon={faBroadcastTower
          } className="text-4xl text-white" />
          <h4 className='font-medium text-3xl ml-4 text-white'>Let's get started!</h4>
        </div>        <form
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

          <div className='flex'>
            <input
              ref={register({ required: true })}
              type="radio"
              className="hidden"
              id="listener"
              name="role"
              required
              value={UserRole.Listener}
            />
            <label
              className={`cursor-pointer text-center font-bold bg-gray-800  rounded-l-lg w-6/12 p-3 hover:underline ${watch("role") === UserRole.Listener
                  ? "text-black bg-yellow-500"
                  : "text-gray-400"
                }`}
              htmlFor="listener"
            >
              LISTENER
            </label>
            <input
              ref={register({ required: true })}
              type="radio"
              className="hidden"
              id="host"
              name="role"
              required
              value={UserRole.Host}
            />
            <label
              className={`cursor-pointer text-center font-bold bg-gray-800  rounded-r-lg w-6/12 p-3 hover:underline ${watch("role") === UserRole.Host
              ? "text-black bg-yellow-500"
              : "text-gray-400"
            }`}
              htmlFor="host"
            >
              HOST
            </label>
          </div>
          {/* <select name="role" ref={register({ required: true })} className="input">
            {Object.keys(UserRole).map((role, index) => <option key={index}>{role}</option>)}
          </select> */}
          <Button canClick={formState.isValid}
            loading={loading}
            actionText={"Create Account"}
          />
          {createAccountMutationResult?.createAccount.error && (<FormError errorMessage={createAccountMutationResult.createAccount.error} />)}
        </form>
        <div className='text-gray-300'>
          Alread have an account? <Link to='/' className=" text-yellow-400 hover:underline">Log in</Link>
        </div>
      </div>
    </div >
  );
};