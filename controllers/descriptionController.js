import * as descriptionService from "../services/descriptionService.js";
import * as requestUtils from "../utils/requestUtils.js";

const addIssue = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    const formData = await request.formData();
    const description = formData.get("description");
    await descriptionService.createIssue(urlParts[2],description);
  
    return requestUtils.redirectTo(`/projects/${urlParts[2]}`);
  };

const removeIssue = async (request) => {
    const url = new URL(request.url);
    const urlPart = url.pathname.split("/");
    
    await descriptionService.removeIssueById(urlPart[4]);
   
    return requestUtils.redirectTo(`/projects/${urlPart[2]}`);
  };
  export { addIssue,removeIssue};