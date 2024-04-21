import { Router } from "express";
import { upload } from "../middlerware/multer.middleware.js";
import { createSkill, fetchSKill } from "../controller/Skill.Controller.js";


const router = Router();

router.route("/createskill").post(upload.single("icon"), createSkill)
router.route("/fetchskill").get(fetchSKill)



export default router;