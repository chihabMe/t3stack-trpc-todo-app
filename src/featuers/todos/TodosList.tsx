import { AnimatePresence } from "framer-motion";
import React from "react";
import Loader from "../../components/ui/Loader";
import { api } from "../../utils/api";
import TodoItem from "./TodoItem";

const TodosList = () => {
  const { data: todos, isLoading } = api.todos.getAllTodos.useQuery();
  if (isLoading)
    return (
      <div className="h-52 w-full">
        <Loader />
      </div>
    );

  return (
    <ul className="  menu rounded-box flex w-full  flex-col gap-2 bg-base-100 p-2 px-2 text-lg font-medium text-black">
      <AnimatePresence>
        {todos?.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </AnimatePresence>
    </ul>
  );
};

export default TodosList;
