import { NextPageContext, type NextPage } from "next";

import TodosList from "../featuers/todos/TodosList";
import AddTodoForm from "../featuers/todos/AddTodoForm";
import UserInfos from "../featuers/user/UserInfos";
import ProtectedRoute from "../components/wrappers/ProtectedRoute";
import Header from "../components/ui/Header";

const Home: NextPage = () => (
  <ProtectedRoute>
    <Header />
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-md flex-col gap-4">
        <TodosList />
        <AddTodoForm />
      </div>
    </main>
  </ProtectedRoute>
);

export default Home;
