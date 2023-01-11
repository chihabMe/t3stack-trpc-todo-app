import React, { FormEvent, useEffect } from "react";
import { api } from "../../utils/api";
interface Props {
  body: string;
  done: boolean;
  id: string;
  created: Date;
}
const TodoItem = ({ body, id, done, created }: Props) => {
  const utils = api.useContext();
  const { mutateAsync: markAdDone, mutate } = api.todos.markAsDone.useMutation({
    onSuccess(input) {
      utils.todos.invalidate();
    },
  });
  const { mutateAsync: deleteTodo } = api.todos.removeTodo.useMutation();
  const toggleDone = () => {
    const todos = utils.todos.getAllTodos.getData();
    utils.todos.getAllTodos.setData(
      undefined,
      todos?.map((todo) => (todo.id != id ? todo : { ...todo, done: !done }))
    );
    markAdDone({ done: !done, id });
  };
  const deleteTodoHandler = () => {
    const todos = utils.todos.getAllTodos.getData();
    utils.todos.getAllTodos.setData(
      undefined,
      todos?.filter((todo) => todo.id != id)
    );
    deleteTodo(
      { id },
      {
        onSuccess(input) {
          utils.todos.invalidate();
        },
      }
    );
  };
  return (
    <li
      onClick={() => {
        toggleDone();
      }}
      className=" h-10 "
    >
      <div className="flex justify-between text-gray-300">
        <span>
          {done && <del>{body}</del>}
          {!done && body}
        </span>
        <div
          className="h-5 w-5 rounded-md bg-red-400 text-center text-sm text-white outline-2 outline-red-300 hover:outline"
          onClick={() => {
            deleteTodoHandler();
          }}
        >
          X
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
