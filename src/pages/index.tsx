import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPageContext,
  type NextPage,
} from "next";

import TodosList from "../featuers/todos/TodosList";
import AddTodoForm from "../featuers/todos/AddTodoForm";
import UserInfos from "../featuers/user/UserInfos";
import ProtectedRoute from "../components/wrappers/ProtectedRoute";
import Header from "../components/ui/Header";
import { api } from "../utils/api";
import Loader from "../components/ui/Loader";
import { getSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: todos, isLoading } = api.todos.getInboxTodos.useQuery();
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="mx-auto w-full max-w-lg flex-col gap-4">
          <h1 className="py-4 text-xl capitalize text-gray-700 dark:text-gray-200">
            inbox
          </h1>
          {todos && <TodosList path="inbox" todos={todos} />}
          {isLoading && !todos && (
            <div className="h-52 w-full">
              <Loader />
            </div>
          )}
          <AddTodoForm path="inbox" />
        </div>
      </main>
    </>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession();
  if (!session?.user)
    return {
      props: {},
      redirect: {
        destination: "/login",
      },
    };

  return {
    props: {},
  };
};
