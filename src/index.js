import dotenv from "dotenv"
import { connectDb } from "./db/index.db.js";
import express, { urlencoded } from "express"
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config({
    path: "./.env"
})
const app = express();


app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}))


app.use(express.json({ limit: "1mb" }))
app.use(urlencoded({ extends: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


import workRouter from "./router/Work.router.js"
import ProjectCategory from "./router/PorjectCategory,router.js";
import ProjectRouter from "./router/Project.router.js"
import ReviewRouter from "./router/Review.router.js"
import NewsLetterRouter from './router/NewsLetter.router.js'
import ExperienceRouter from "./router/Experience.router.js"
import SkillRouter from "./router/Skill.router.js"

app.use("/api/v1/work", workRouter)
app.use("/api/v1/projectCategory", ProjectCategory)
app.use("/api/v1/project", ProjectRouter)
app.use("/api/v1/review", ReviewRouter)
app.use("/api/v1/mewsletter", NewsLetterRouter)
app.use("/api/v1/experience", ExperienceRouter)
app.use("/api/v1/skill", SkillRouter)




connectDb()
    .then(() => {
        app.on("Error", (Error) => {
            console.log("Error", Error)
            throw new Error
        })
        app.listen(process.env.PORT, () => {

            console.log('app is listen on this port', process.env.PORT)
        })
    })
    .catch(() => {
        console.log("Error into db connection Or server issue ")
    })