import { Todo } from "@prisma/client";
import React, { FormEvent, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import Loader from "../../components/ui/Loader";
import { api } from "../../utils/api";

const AddTodoForm = () => {
  const utils = api.useContext();
  const {
    mutateAsync: addTodo,
    isSuccess,
    isLoading,
  } = api.todos.addTodo.useMutation();
  const [todoBody, setTodoBody] = useState("");
  const todoSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (todoBody.trim().length >= 1) {
      const todos = utils.todos.getAllTodos.getData();
      const newTodo: Todo = {
        body: todoBody,
        created: new Date(),
        updated: new Date(),
        id: new Date().toDateString(),
        done: false,
        projectId: "1",
        userId: "1",
      };
      if (todos)
        utils.todos.getAllTodos.setData((() => {})(), [...todos, newTodo]);
      else utils.todos.getAllTodos.setData((() => {})(), [newTodo]);
      setTodoBody("");
      addTodo(
        {
          body: todoBody,
        },
        {
          async onSuccess(input) {
            utils.todos.invalidate();
          },
        }
      );
    }
  };
  // useEffect(() => {
  //   if (isSuccess && !isLoading) {
  //   }
  // }, [isLoading, isSuccess]);
  return (
    <form
      onSubmit={todoSubmitHandler}
      className="flex w-full flex-col gap-2  p-2 py-6"
    >
      <input
        type="text"
        placeholder="Type here"
        className="input-bordered input-primary input w-full    "
        value={todoBody}
        onChange={(e) => {
          setTodoBody(e.currentTarget.value);
        }}
      />
      <button className="btn-primary btn">
        {!isLoading && "add"}
        {isLoading && "adding"}
      </button>
    </form>
  );
};

export default AddTodoForm;
