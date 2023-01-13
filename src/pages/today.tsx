import { NextPageContext, type NextPage } from "next";

import TodosList from "../featuers/todos/TodosList";
import AddTodoForm from "../featuers/todos/AddTodoForm";
import UserInfos from "../featuers/user/UserInfos";
import ProtectedRoute from "../components/wrappers/ProtectedRoute";
import Header from "../components/ui/Header";
import { api } from "../utils/api";
import Loader from "../components/ui/Loader";

const Today: NextPage = () => {
  const { data: todos, isLoading } = api.todos.getTodayTodos.useQuery();
  return (
    <ProtectedRoute>
      <Header />
      <main className="min-h-screen">
        <div className="mx-auto w-full max-w-lg flex-col gap-4">
          <h1 className="py-4 text-xl capitalize text-gray-700 dark:text-gray-200">
            today
          </h1>
          {!isLoading && todos && <TodosList path="today" todos={todos} />}
          {isLoading && (
            <div className="h-52 w-full">
              <Loader />
            </div>
          )}
          <AddTodoForm path="today" />
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default Today;
