import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/ui/Header";
import Loader from "../../components/ui/Loader";
import ProtectedRoute from "../../components/wrappers/ProtectedRoute";
import AddProjectTodoForm from "../../featuers/projects/AddProjectTodoForm";
import ProjectHeader from "../../featuers/projects/ProjectHeader";
import ProjectTodosList from "../../featuers/projects/projectTodosList";
import AddTodoForm from "../../featuers/todos/AddTodoForm";
import TodosList from "../../featuers/todos/TodosList";
import { api } from "../../utils/api";

const project = () => {
  const router = useRouter();
  const slugs = router.query.slug;
  const slug = (slugs && slugs[0]) ?? "";
  const { data: todos, isLoading } = api.todos.getAllTodosByProject.useQuery({
    projectId: slug,
  });
  return (
    <ProtectedRoute>
      <Header />
      <main className="min-h-screen">
        <div className="mx-auto w-full max-w-md flex-col gap-4">
          <ProjectHeader />
          {!isLoading && todos && <ProjectTodosList todos={todos} />}
          {isLoading && (
            <div className="h-52 w-full">
              <Loader />
            </div>
          )}
          <AddProjectTodoForm />
        </div>
      </main>
    </ProtectedRoute>
  );
};

export default project;
