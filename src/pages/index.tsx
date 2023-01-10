import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { GridLoader, MoonLoader } from "react-spinners";
import Image from "next/image";

import { api } from "../utils/api";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { data: user, status: authStatus } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (authStatus == "unauthenticated") router.push("/login");
  }, [authStatus]);
  const { data: todos, status, refetch } = api.todos.getAllTodos.useQuery();
  const {
    mutateAsync: toggleDone,
    isSuccess: isDoneSuccess,
    data: doneData,
  } = api.todos.markAsDone.useMutation();
  const [todoBody, setTodoBody] = useState("");
  const markAsDone = ({ id, done }: { id: string; done: boolean }) => {
    toggleDone({
      id,
      done: !done,
    });
  };
  const {
    data,
    isError,
    isSuccess: isAddedSuccessFully,
    isLoading: isAdding,
    mutateAsync: addTodo,
  } = api.todos.addTodo.useMutation();
  const todoSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (todoBody.trim().length >= 1) {
      addTodo({ body: todoBody });
    }
  };
  useEffect(() => {
    refetch();
  }, [isDoneSuccess, doneData]);
  useEffect(() => {
    setTodoBody("");
    refetch();
  }, [data, setTodoBody, isAddedSuccessFully]);
  if (authStatus == "loading") return <GridLoader color="teal" size={15} />;
  if (status == "loading")
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <GridLoader color="teal" size={15} />
      </div>
    );
  return (
    <div>
      <div className="mx-auto w-full max-w-md flex-col gap-4 pt-10">
        <div className="flex items-center gap-4 ">
          {user && user.user && user.user.image && (
            <Image
              className="rounded-full p-2"
              src={user.user.image}
              alt={user.user.name + " profile image"}
              width={50}
              height={50}
            />
          )}
          <h1>{user?.user?.name}</h1>
          <button
            className="cursor-pointer rounded-md bg-red-400 px-1 py-1 text-sm text-white"
            onClick={() => {
              signOut();
            }}
          >
            logout
          </button>
        </div>
        <form
          onSubmit={todoSubmitHandler}
          className="flex flex-col gap-2 p-2 py-6"
        >
          <input
            className="rounded-md bg-gray-200 p-2"
            value={todoBody}
            onChange={(e) => {
              setTodoBody(e.currentTarget.value);
            }}
            type="text"
          />
          <button className="h-12  w-full rounded-md bg-blue-400 font-medium text-white  active:animate-bounce ">
            {!isAdding && "add"}
            {isAdding && <MoonLoader size={12} color="teal" />}
          </button>
        </form>
        <ul className="flex flex-col gap-2 px-2 text-lg font-medium text-black">
          {todos?.map((item) => {
            return (
              <li
                onClick={markAsDone.bind(null, {
                  id: item.id,
                  done: item.done,
                })}
                className="w-full cursor-pointer rounded-md bg-gray-200 py-2 px-2  text-left"
                key={item.id}
              >
                {!item.done && item.body}
                {item.done && <del>{item.body}</del>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
