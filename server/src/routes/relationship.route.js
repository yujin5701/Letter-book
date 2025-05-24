import express from "express";
import { invite, handleAcceptRelationship } from "../controllers/relationship.controllers";
import { verify } from "jsonwebtoken";

const router = express.Router();

router.post("/relationship/invite", invite);
router.post("/relationship/accept", handleAcceptRelationship);

export default router;