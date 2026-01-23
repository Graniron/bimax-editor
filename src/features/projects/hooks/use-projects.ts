import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useProjects = () => {
  return useQuery(api.projects.get);
}


export const useProjectsPartial = (limit: number) => {
  return useQuery(api.projects.getPartial, { limit });
}

export const useCreateProject = () => {
  return useMutation(api.projects.create).withOptimisticUpdate(
    (localStore, args) => {
      const existing = localStore.getQuery(api.projects.get);

      if (existing !== undefined) {
        const now = Date.now();
        const newProject = {
          _id: crypto.randomUUID() as Id<"projects">,
          _creationTime: now,
          name: args.name,
          updateAt: now,
          ownerId: 'anonymous',
        };
        localStore.setQuery(api.projects.get, {}, [newProject, ...existing]);
      }
    }
  );
}

export const useProject = (id: Id<"projects">) => {
  return useQuery(api.projects.getById, { id });
}

export const useRenameProject = (projectId: Id<"projects">) => {
  return useMutation(api.projects.rename).withOptimisticUpdate(
    (localStore, args) => {
      const prevProject = localStore.getQuery(api.projects.getById, { id: projectId });

      if (prevProject !== undefined && prevProject !== null) {
        localStore.setQuery(
          api.projects.getById,
          { id: projectId },
          {
            ...prevProject,
            name: args.name,
            updateAt: Date.now(),
          }
        );
      }

      const existing = localStore.getQuery(api.projects.get);

      if (existing !== undefined) {
        localStore.setQuery(
          api.projects.get,
          {},
          existing.map((project) =>
            project._id === projectId
              ? {
                  ...project,
                  name: args.name,
                  updateAt: Date.now(),
                }
              : project
          )
        );
      }


    }
  );
}