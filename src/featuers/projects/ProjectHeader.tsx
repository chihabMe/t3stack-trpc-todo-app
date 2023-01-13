import { useRouter } from "next/router";
import React from "react";
import { api } from "../../utils/api";

const ProjectHeader = () => {
  const router = useRouter();
  const slugs = router.query.slug;
  const slug = (slugs && slugs[0]) ?? "";
  const { data: project, isLoading } = api.projects.getProjectById.useQuery({
    id: slug,
  });
  return (
    <div className="my-2 py-2">
      <h1 className="text-xl font-medium capitalize text-gray-800 dark:text-gray-200">
        {project?.name}
      </h1>
    </div>
  );
};

export default ProjectHeader;
