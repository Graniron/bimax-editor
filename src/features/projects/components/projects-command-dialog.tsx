import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useProjects } from "../hooks/use-projects";
import { Doc } from "../../../../convex/_generated/dataModel";


interface ProjectsCommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getProjectIcon = (project: Doc<"projects">) => {
  if (project.importStatus === "completed") {
    return <FaGithub className="size-4 text-muted-foreground" />
  }

  
  if (project.importStatus === "failed") {
    return <AlertCircleIcon className="size-4 text-muted-foreground" />
  }

  if (project.importStatus === "importing") {
    return <Loader2Icon className="size-4 text-muted-foreground animate-spin" />;
  }

  return <GlobeIcon className="size-4 text-muted-foreground" />;
}

export function ProjectsCommandDialog({ open, onOpenChange }: ProjectsCommandDialogProps) {
  const router = useRouter();
  const projects = useProjects();

  function handleProjectSelect(projectId: string) {
    router.push(`/projects/${projectId}`);
    onOpenChange(false);
  }

  return (
    <CommandDialog open={open} title="Search Projects" description="Search and navigate to your projects" onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search projects..." />
      <CommandList>
        <CommandEmpty>No projects found.</CommandEmpty>
        <CommandGroup heading="Projects">
          {projects?.map((project) => (
            <CommandItem key={project._id} value={`${project.name}-${project._id}`} onSelect={() => handleProjectSelect(project._id)}>
              {getProjectIcon(project)}
              <span>{project.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )

};