import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue, StateGraph, START, END, ReducedValue } from "@langchain/langgraph";
import type { GraphNode } from "@langchain/langgraph";
import { createAgent,providerStrategy } from "langchain";
import { geminiModel, mistralModel, cohereModel } from "./models.service.js";

import * as z from "zod";

const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(""),{
        reducer: (curr,next)=>{
            return next
        }
    }),
    solution_2: new ReducedValue(z.string().default(""),{
        reducer: (curr,next)=>{
            return next
        }
    }),
    judge_recomomendation: new ReducedValue(z.object().default({
        solution_1_score: 0,
        solution_2_score: 0,
    }),{
        reducer: (curr,next)=>{
            return next
        }
    })
});


const solutionNode: GraphNode<typeof State> = async (state) => {
    console.log("in solution node");
    const [mistral_solution, cohere_solution] = await Promise.all([
        mistralModel.invoke(state.messages[0]?.text),
        cohereModel.invoke(state.messages[0]?.text)
    ]);
    return{
        solution_1: mistral_solution.content,
        solution_2: cohere_solution.content
    }
}

const judgeNode: GraphNode<typeof State> = async (state) => {
    console.log("in judge node");
    const { solution_1, solution_2 } = state;
    const judge = createAgent({
        model: geminiModel,
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
        }))
    })

    const judge_recomendation = await judge.invoke({
        messages:[
            new HumanMessage(
                `Judge the following two solutions and give them a score between 0 and 10, where 10 is the best score
                Solution 1: ${solution_1}
                Solution 2: ${solution_2}
                Please provide the scores between 0 and 10 for each solution , where 0 means the solution is completely wrong and 10 means the solution is perfect.
                `
            )
        ]
    })

    const result = judge_recomendation.structuredResponse;
    return{
        judge_recomomendation: result
    }

}

const graph = new StateGraph(State)
    .addNode("solution",solutionNode)
    .addNode("judge", judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution", "judge")
    .addEdge("judge", END)
    .compile();

export default async function(userMessage: string){
    const result = await graph.invoke({
        messages:[
            new HumanMessage(userMessage)
        ]
    })
    console.log("Final Result: ", result);
    return result;
}