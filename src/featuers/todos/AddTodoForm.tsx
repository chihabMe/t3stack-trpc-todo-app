import React, { FormEvent, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import Loader from "../../components/ui/Loader";
import { api } from "../../utils/api";

const AddTodoForm = () => {
  const {
    mutateAsync: addTodo,
    isSuccess,
    isLoading,
  } = api.todos.addTodo.useMutation();
  const [todoBody, setTodoBody] = useState("");
  const todoSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (todoBody.trim().length >= 1) {
      addTodo({
        body: todoBody,
      });
    }
  };
  useEffect(() => {
    if (isSuccess && !isLoading) {
      setTodoBody("");
    }
  }, [isLoading, isSuccess]);
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
