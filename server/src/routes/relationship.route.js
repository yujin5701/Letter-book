import express from "express";
import { invite, handleAcceptRelationship } from "../controllers/relationship.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/invite", verifyToken, invite);
router.post("/accept", verifyToken, handleAcceptRelationship);

export default router;