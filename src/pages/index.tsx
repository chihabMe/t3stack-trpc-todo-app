import { NextPageContext, type NextPage } from "next";

import TodosList from "../featuers/todos/TodosList";
import AddTodoForm from "../featuers/todos/AddTodoForm";
import UserInfos from "../featuers/user/UserInfos";
import ProtectedRoute from "../components/wrappers/ProtectedRoute";
import Header from "../components/ui/Header";
import { api } from "../utils/api";
import Loader from "../components/ui/Loader";

const Home: NextPage = () => {
  const { data: todos, isLoading } = api.todos.getAllTodos.useQuery();
  return (
    <ProtectedRoute>
      <Header />
      <main className="min-h-screen">
        <div className="mx-auto w-full max-w-md flex-col gap-4">
          {!isLoading && todos && <TodosList todos={todos} />}
          {isLoading && (
            <div className="h-52 w-full">
              <Loader />
            </div>
          )}
          <AddTodoForm />
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default Home;
