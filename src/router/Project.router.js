import { Router } from "express";
import { createProjects, fetchProjects } from "../controller/Project.Contoller.js";


const router = Router()


router.route("/createProjects").post(createProjects)
router.route("/fetchProjects").get(fetchProjects)


export default router