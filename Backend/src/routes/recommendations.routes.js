import express from "express";
import { analyzeLocationController } from "../controllers/recommendations.controller.js";
import { locationValidator } from "../validators/location.validator.js";

const router = express.Router();

// POST /api/recommendations - Analyze location for tree recommendations
router.post("/", locationValidator, analyzeLocationController);

export default router;
