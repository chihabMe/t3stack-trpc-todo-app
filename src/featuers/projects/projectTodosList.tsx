import React from "react";

import { Todo } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import Loader from "../../components/ui/Loader";
import { api } from "../../utils/api";
import ProjectTodoItem from "./ProjectTodoItem";

const ProjectTodosList = ({ todos }: { todos: Todo[] }) => {
  return (
    <ul className="  menu rounded-box flex w-full  flex-col gap-2 bg-base-100 p-2 px-2 text-lg font-medium text-black">
      {todos?.map((todo) => {
        return <ProjectTodoItem key={todo.id} {...todo} />;
      })}
    </ul>
  );
};

export default ProjectTodosList;
