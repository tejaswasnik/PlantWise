import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import recommendationsRouter from "./routes/recommendations.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/recommendations", recommendationsRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

export default app;
