import { Todo } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Loader from "../../components/ui/Loader";
import { api } from "../../utils/api";
import TodoItem from "./TodoItem";

const TodosList = ({
  todos,
  path,
}: {
  todos: Todo[];
  path: "inbox" | "today";
}) => {
  return (
    <ul className="  menu rounded-box flex w-full  flex-col gap-2 bg-base-100 p-2 px-2 text-lg font-medium text-black">
      {todos?.map((todo) => {
        return <TodoItem path={path} key={todo.id} {...todo} />;
      })}
    </ul>
  );
};

export default TodosList;
