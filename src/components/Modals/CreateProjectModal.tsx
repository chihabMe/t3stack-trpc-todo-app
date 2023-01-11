import { PlusIcon } from "@heroicons/react/24/solid";
import { createPortal } from "react-dom";
import React, { FormEvent, ReactNode, useState } from "react";
import PortalWrapper from "../wrappers/PortalWrapper";
import { api } from "../../utils/api";

const CreateProjectModal = () => {
  const [projectName, setProjectName] = useState("");
  const {
    mutateAsync: createProject,
    isLoading: isCreateLoading,
    isError: isCreateError,
  } = api.projects.createProject.useMutation();
  const utils = api.useContext();
  const createProjectSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    createProject(
      {
        name: projectName,
      },
      {
        onSuccess(input) {
          utils.projects.getAllProjects.invalidate();
          setProjectName("");
        },
      }
    );
  };
  return (
    <>
      <label htmlFor="my-modal" className="btn-ghost btn">
        <PlusIcon className="h-4 w-4 text-white" />
      </label>
      <PortalWrapper id="modal">
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal ">
          <div className="modal-box p-8">
            <form onSubmit={createProjectSubmitHandler} action="">
              <input
                value={projectName}
                onChange={(e) => {
                  setProjectName(e.currentTarget.value);
                }}
                type="text"
                placeholder="Project name"
                className="input-bordered input-primary input w-full text-gray-700 dark:text-gray-200  "
              />
              <div className="modal-action">
                <div className="flex-end flex items-center gap-4">
                  <label
                    htmlFor="my-modal"
                    className="btn-error btn lowercase text-white"
                  >
                    cancel
                  </label>
                  <button className="btn-primary btn lowercase">create</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </PortalWrapper>
    </>
  );
};
export default CreateProjectModal;
