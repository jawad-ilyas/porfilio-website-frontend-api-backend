import { Router } from "express";
import { createReview, fetchReview } from "../controller/Review.Controller.js";
import { upload } from "../middlerware/multer.middleware.js";



const router = Router();



router.route("/createReview").post(upload.single("reviewImage"),createReview)
router.route("/fetchReview").get(fetchReview)



export default router