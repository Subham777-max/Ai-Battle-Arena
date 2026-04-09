import { Router } from "express";
import { invokeGraph } from "../controllers/ai.controller.js";

const router = Router();


/**
 *  @route POST /api/ai/invoke
 *  @desc Invoke the AI graph with a given problem statement and return the solutions and judgments.
 *  @access Public 
 */
router.post("/invoke",invokeGraph);

export default router;