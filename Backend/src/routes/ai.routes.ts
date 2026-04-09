import { Router } from "express";
import { getAllResponses, invokeGraph } from "../controllers/ai.controller.js";

const router = Router();


/**
 *  @route POST /api/ai/invoke
 *  @desc Invoke the AI graph with a given problem statement and return the solutions and judgments.
 *  @access Public 
 */
router.post("/invoke",invokeGraph);

/**
 *  @route GET /api/ai/responses
 *  @desc Retrieve all past problem statements, solutions, and judgments from the database.
 *  @access Public
 */
router.get("/responses", getAllResponses);


export default router;