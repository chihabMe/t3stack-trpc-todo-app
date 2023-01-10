import { NextPageContext, type NextPage } from "next";

import TodosList from "../featuers/todos/TodosList";
import AddTodoForm from "../featuers/todos/AddTodoForm";
import UserInfos from "../featuers/user/UserInfos";
import ProtectedRoute from "../components/wrappers/ProtectedRoute";

const Home: NextPage = () => (
  <ProtectedRoute>
    <div className="mx-auto w-full max-w-md flex-col gap-4">
      <UserInfos />
      <AddTodoForm />
      <TodosList />
    </div>
  </ProtectedRoute>
);

export default Home;
