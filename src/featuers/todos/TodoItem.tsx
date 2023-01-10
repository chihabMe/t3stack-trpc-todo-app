import React from "react";
import { api } from "../../utils/api";
interface Props {
  body: string;
  done: boolean;
  id: string;
  created: Date;
}
const TodoItem = ({ body, id, done, created }: Props) => {
  const { mutateAsync: markAdDone } = api.todos.markAsDone.useMutation();
  const toggleDone = () => {
    markAdDone({ done: !done, id });
  };
  return (
    <li
      onClick={() => {
        toggleDone();
      }}
      className=""
    >
      <span className="text-gray-300">
        {!done && <del>{body}</del>}
        {done && body}
      </span>
    </li>
  );
};

export default TodoItem;
