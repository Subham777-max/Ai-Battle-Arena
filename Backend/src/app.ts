import express from "express";
import aiRoutes from "./routes/ai.routes.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}));

app.use("/api/ai", aiRoutes);


app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});


export default app;