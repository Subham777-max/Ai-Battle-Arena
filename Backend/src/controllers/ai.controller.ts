import responseModel from "../models/resopnse.model.js";
import runGraph from "../services/graph.ai.service.js";
import { type Request, type Response } from "express";

export async function invokeGraph(req: Request, res: Response){
    const { problem } = req.body;
    if(!problem){
        return res.status(400).json({ error: "Problem statement is required" });
    }
    try {
        const graphResult = await runGraph(problem);
        const newResponse = await responseModel.create({
            problem,
            solution_1: graphResult.solution_1,
            solution_2: graphResult.solution_2,
            judge:{
                solution_1_score: graphResult.judge.solution_1_score,
                solution_2_score: graphResult.judge.solution_2_score,
                solution_1_reasoning: graphResult.judge.solution_1_reasoning,
                solution_2_reasoning: graphResult.judge.solution_2_reasoning
            }
        })
        res.status(201).json({
            message: "Graph invoked successfully",
            data: newResponse
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

}

export async function getAllResponses(req: Request, res: Response){
    try {
        const responses = await responseModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Responses retrieved successfully",
            data: responses
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}