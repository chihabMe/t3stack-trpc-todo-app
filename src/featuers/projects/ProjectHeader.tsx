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
    <div>
      <h1>name:{project?.name}</h1>
    </div>
  );
};

export default ProjectHeader;
