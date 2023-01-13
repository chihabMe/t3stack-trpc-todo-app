import { AnimatePresence, motion } from "framer-motion";
import React, { FormEvent, useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { api } from "../../utils/api";
import Alert from "../../components/ui/Alert";
interface Props {
  body: string;
  done: boolean;
  id: string;
  created: Date;
  path: "inbox" | "today";
}
const TodoItem = ({ body, id, done, created, path }: Props) => {
  const utils = api.useContext();
  const [showDoneAlert, setShowDoneAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { mutateAsync: markAdDone, mutate } = api.todos.markAsDone.useMutation({
    onSuccess(input) {
      // utils.todos.invalidate();
    },
  });
  const { mutateAsync: deleteTodo } = api.todos.removeTodo.useMutation();
  const toggleDone = () => {
    const todos =
      path == "inbox"
        ? utils.todos.getInboxTodos.getData()
        : utils.todos.getTodayTodos.getData();
    if (path == "inbox") {
      utils.todos.getInboxTodos.setData(
        undefined,
        todos?.map((todo) =>
          todo.id != id ? todo : { ...todo, done: !todo.done }
        )
      );
    } else {
      utils.todos.getTodayTodos.setData(
        undefined,
        todos?.map((todo) =>
          todo.id != id ? todo : { ...todo, done: !todo.done }
        )
      );
    }
    markAdDone(
      { done: !done, id },
      {
        onSuccess() {
          setShowDoneAlert(true);
        },
      }
    );
  };
  const deleteTodoHandler = () => {
    setShowDeleteAlert(true);
    if (path == "inbox") {
      const todos = utils.todos.getInboxTodos.getData();
      utils.todos.getInboxTodos.setData(
        undefined,
        todos?.filter((todo) => todo.id != id)
      );
    } else {
      const todos = utils.todos.getTodayTodos.getData();
      utils.todos.getTodayTodos.setData(
        undefined,
        todos?.filter((todo) => todo.id != id)
      );
    }
    deleteTodo(
      { id },
      {
        onSuccess(input) {
          // utils.todos.invalidate();
        },
      }
    );
  };
  return (
    <>
      {showDoneAlert && (
        <Alert setShow={setShowDoneAlert} text={"task completed"} />
      )}
      {showDeleteAlert && (
        <Alert setShow={setShowDeleteAlert} text={"task deleted"} />
      )}
      <motion.li
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 10,
        }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{
          opacity: 0,
          scale: 0.9,
          x: "5%",
          y: "5%",
          rotate: -2,
        }}
        className=" h-8  "
      >
        <div className="flex py-2   active:scale-[0.99]  ">
          <div
            onClick={() => {
              toggleDone();
            }}
            className="  flex w-full "
          >
            {done && (
              <del className="  text-primary">
                <span className="text-gray-600 dark:text-gray-400 ">
                  {body}
                </span>
              </del>
            )}
            {!done && (
              <span className="text-gray-700 dark:text-gray-100 ">{body}</span>
            )}
          </div>
          <div
            className="  rounded-md bg-red-400 p-1 text-center text-sm !text-white  outline-2 outline-red-300 hover:outline"
            onClick={() => {
              deleteTodoHandler();
            }}
          >
            <TrashIcon className="h-4 w-4 text-white" />
          </div>
        </div>
      </motion.li>
    </>
  );
};

export default TodoItem;
