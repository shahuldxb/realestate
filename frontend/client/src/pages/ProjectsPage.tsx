import CrudPage from "@/components/CrudPage";
import { projectsConfig } from "@/lib/moduleConfigs";

export default function ProjectsPage() {
  return <CrudPage {...projectsConfig} />;
}
