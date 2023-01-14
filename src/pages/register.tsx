import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { api } from "../utils/api";
const initialForm = {
  email: "",
  username: "",
  password: "",
  re_password: "",
};
const Register = () => {
  const router = useRouter();
  const {
    mutateAsync: register,
    isLoading,
    isSuccess,
    isError,
    error,
  } = api.auth.register.useMutation();
  const [form, setForm] = useState(initialForm);
  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.currentTarget.name]: e.currentTarget.value,
    }));
  };
  const registerSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    register({
      email: form.email,
      name: form.username,
      password: form.password,
      re_password: form.re_password,
    });
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      router.push("/login");
    }
  }, [isLoading, isSuccess]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-2">
      <form
        className="flex w-full max-w-sm flex-col gap-3 rounded-md p-2"
        onSubmit={registerSubmitHandler}
        action=""
      >
        <input
          type="text"
          name="username"
          placeholder="enter your name"
          className="input-bordered input-secondary input w-full  "
        />
        <input
          type="email"
          name="email"
          placeholder="enter your email"
          className="input-bordered input-secondary input w-full "
        />
        <input
          type="password"
          name="password"
          placeholder="Type here"
          className="input-bordered input-secondary input w-full "
        />
        <input
          type="password"
          name="re_password"
          placeholder="confirm your password"
          className="input-bordered input-secondary input w-full "
        />
        <button className="btn-primary btn text-white">
          {!isLoading && "register"}
          {isLoading && <MoonLoader size={8} color="white" />}
        </button>
      </form>
    </div>
  );
};

export default Register;
