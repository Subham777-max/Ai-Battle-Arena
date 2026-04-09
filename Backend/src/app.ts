import express from "express";
import runGraph from "./services/graph.ai.service.js";
import aiRoutes from "./routes/ai.routes.js";
const app = express();

app.use(express.json());


app.use("/api/ai", aiRoutes);


app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// app.post("/use-graph", async (req, res) => {
//   const result = await runGraph("write an factorial function in javascript");
//   res.status(200).json(result);
// });
export default app;