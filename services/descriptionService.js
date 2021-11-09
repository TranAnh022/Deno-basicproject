import { executeQuery } from "../database/database.js";

const createIssue = async (project_id,description) => {
  await executeQuery(
    "INSERT INTO project_issues (project_id,description) VALUES ($1,$2);",
    project_id,description,
    
  );
};
const viewDescription = async(id) =>{
  let result = await executeQuery("SELECT * FROM project_issues WHERE project_id =$1;",id); 
return result.rows;
}

const removeIssueById = async(id) =>{
  await executeQuery("DELETE FROM project_issues WHERE id =$1 ;", id,);
};

export { createIssue,viewDescription,removeIssueById };