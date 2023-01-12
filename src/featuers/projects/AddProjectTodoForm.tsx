import { PlusIcon } from "@heroicons/react/24/solid";
import { Todo } from "@prisma/client";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import Loader from "../../components/ui/Loader";
import { api } from "../../utils/api";

const AddProjectTodoForm = () => {
  const router = useRouter();
  const slugs = router.query.slug;
  const slug = (slugs && slugs[0]) ?? "";

  const utils = api.useContext();
  const [showInput, setShowInput] = useState(false);
  const {
    mutateAsync: addTodo,
    isSuccess,
    isLoading,
  } = api.todos.addProjectTodo.useMutation();
  const [todoBody, setTodoBody] = useState("");
  const todoSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (todoBody.trim().length >= 1) {
      const todos = utils.projects.getTodos.getData({ id: slug });
      const newTodo: Todo = {
        body: todoBody,
        created: new Date(),
        updated: new Date(),
        id: new Date().toDateString(),
        done: false,
        projectId: slug,
        userId: "1",
      };
      if (todos)
        utils.projects.getTodos.setData({ id: slug }, [...todos, newTodo]);
      else utils.projects.getTodos.setData({ id: slug }, [newTodo]);
      setTodoBody("");
      addTodo(
        {
          body: todoBody,
          projectId: slug,
        },
        {
          async onSuccess(input) {
            utils.projects.getTodos.invalidate({ id: slug });
          },
        }
      );
    }
  };
  // useEffect(() => {
  //   if (isSuccess && !isLoading) {
  //   }
  // }, [isLoading, isSuccess]);
  if (!showInput)
    return (
      <button
        className="btn-primary btn mx-6 my-6 flex h-8 !min-h-[15px] items-center  gap-2"
        onClick={() => {
          setShowInput(true);
        }}
      >
        <PlusIcon className="h-5 w-5 text-white" />
        <span className="text-xs  ">add a task</span>
      </button>
    );
  return (
    <form
      onSubmit={todoSubmitHandler}
      className="flex w-full flex-col gap-2  p-2 py-6"
    >
      <textarea
        value={todoBody}
        onChange={(e) => {
          setTodoBody(e.currentTarget.value);
        }}
        className="textarea-primary textarea resize-none text-primary"
        placeholder="task..."
      ></textarea>
      <div className=" flex  justify-end gap-4 py-4">
        <div
          className="btn-error flex  h-9 cursor-pointer items-center  justify-center rounded-md px-7 text-center text-xs font-bold uppercase text-white hover:opacity-90"
          onClick={() => {
            setShowInput(false);
          }}
        >
          close
        </div>
        <button className="btn-primary flex h-9 items-center  justify-center rounded-md px-7 text-center text-xs font-bold uppercase text-white">
          {!isLoading && "add task"}
          {isLoading && "adding"}
        </button>
      </div>
    </form>
  );
};

export default AddProjectTodoForm;
