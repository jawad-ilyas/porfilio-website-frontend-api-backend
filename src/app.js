import express, { urlencoded } from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"

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
app.use("/api/v1/work", workRouter)
app.use("/api/v1/projectCategory", ProjectCategory)
app.use("/api/v1/project", ProjectRouter)


export { app }