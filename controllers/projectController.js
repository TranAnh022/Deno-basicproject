import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as projectService from "../services/projectService.js";
import * as descriptionService from "../services/descriptionService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};



const removeProject = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const id = parts[2];
  await projectService.removeById(id);

  return requestUtils.redirectTo("/projects");
};

const addProject = async (request) => {
  const formData = await request.formData();

  const name = formData.get("name");
  await projectService.create(name);

  return requestUtils.redirectTo("/projects");
};

const viewProject = async (request)=>{
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const data= {
    project : await projectService.findById(urlParts[2]),
    description: await descriptionService.viewDescription(urlParts[2]),
  };
  return new Response(await renderFile("project.eta", data), responseDetails);
};
  
const viewProjects = async (request) => {
  const data = {
    projects: await projectService.listProjects(),
  };

  return new Response(await renderFile("projects.eta", data), responseDetails);
};
  
  export { addProject, viewProjects,removeProject,viewProject};