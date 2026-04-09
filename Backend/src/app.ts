import express from "express";
import aiRoutes from "./routes/ai.routes.js";
const app = express();

app.use(express.json());


app.use("/api/ai", aiRoutes);


app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});


export default app;