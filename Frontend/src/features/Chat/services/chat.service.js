import { api } from "../../Api/api";

export async function invokeAI(problem) {
  const response = await api.post("/ai/invoke", { problem });
  return response.data;
}

export async function getAllResponses() {
  const response = await api.get("/ai/responses");
  return response.data;
}