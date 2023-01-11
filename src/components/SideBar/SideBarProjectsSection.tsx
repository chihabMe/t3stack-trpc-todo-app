import { PlusIcon } from "@heroicons/react/24/solid";
import React from "react";
import { api } from "../../utils/api";
import CreateProjectModal from "../Modals/CreateProjectModal";
import SideBarItem from "./SideBarItem";
import SideBarTitle from "./SideBarTitle";

const SideBarProjectsSection = () => {
  const {
    data: projects,
    isLoading,
    isError,
  } = api.projects.getAllProjects.useQuery();
  return (
    <ul className="flex flex-col">
      <div className="flex items-center justify-between">
        <SideBarTitle text="projects" />
        <CreateProjectModal />
      </div>
      {projects?.map((project) => (
        <SideBarItem key={project.id}>
          <span className="hover:bg-transparent">{project.name}</span>
          <span className="badge-primary badge indicator-item !h-6 !w-6 !rounded-full !p-2 !text-xs">
            {project._count.todos}
          </span>
        </SideBarItem>
      ))}
    </ul>
  );
};

export default SideBarProjectsSection;
