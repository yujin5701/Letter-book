import express from "express";
import {getHomeInfo} from "../controllers/home.controller.js"
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/home", verifyToken, getHomeInfo);

export default router;