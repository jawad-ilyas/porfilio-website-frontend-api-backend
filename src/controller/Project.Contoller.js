import { Project } from "../models/Project.models.js";
import { ApiError } from "../utilis/ApiError.utilis.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { asyncHandler } from "../utilis/asyncHandler.utilis.js";



// ! controller for create new project
const createProjects = asyncHandler(async (req, res) => {

    console.log("whole data of the create project into backend api ", req.body)

    console.log("data into the create project ", req.body)
    const {
        projectName,
        projectDescription,
        projectDeployLink,
        projectGithubLink,
        projectTags
    } = req.body
    // console.table({
    //     "Project Name": projectName,
    //     "Project Description": projectDescription,
    //     "Project Deploy Link": projectDeployLink,
    //     "Project Github Link": projectGithubLink,
    //     "Project Tags": projectTags
    // });

    //  * Check Project Name is already EXIST or not 
    const projectFind = await Project.findOne({ projectName })
    // console.log('check project name is already present or not " ', projectFind)

    if (projectFind != null) {
        throw new ApiError(400, "Project Name is Already present ")
    }

    const projectInsertion = await Project.create({
        projectName,
        projectDescription,
        projectDeployLink,
        projectGithubLink,
        projectTags
    })
    // console.log('Result After Creation of the project  " ', projectInsertion)

    res.status(201).json(
        new ApiResponse(200, "New Project is Created ")
    )
})


// ! controller for fetch projects 
const fetchProjects = asyncHandler(async (req, res) => {

    const projectsFetch = await Project.find();
    res.status(200).json(
        new ApiResponse(200, "Fetched Project ", projectsFetch)
    )

})

export { createProjects, fetchProjects }