import { NextPageContext, type NextPage } from "next";

import TodosList from "../featuers/todos/TodosList";
import AddTodoForm from "../featuers/todos/AddTodoForm";
import UserInfos from "../featuers/user/UserInfos";
import ProtectedRoute from "../components/wrappers/ProtectedRoute";
import Header from "../components/ui/Header";

const Home: NextPage = () => (
  <ProtectedRoute>
    <Header />
    <div className="mx-auto w-full max-w-md flex-col gap-4">
      <TodosList />
      <AddTodoForm />
    </div>
  </ProtectedRoute>
);

export default Home;
