"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";

const Page = () => {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);

  return <div>
    <Button onClick={() => createProject({ name: 'New project' })}>Add new</Button>
    {projects?.map((project) => (
      <div key={project._id} className="mb-4 p-4 border rounded">
        <h2 className="text-lg font-bold">{project.name}</h2>
        <div>{project.ownerId}</div>
      </div>
    ))}
  </div>;
};

export default Page;