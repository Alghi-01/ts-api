import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/user.router";
import { PortType } from "./types/user.type";

dotenv.config();

const PORT: PortType = process.env.PORT || 3000;

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>Hello Guys</h1>");
});

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log("Server running", PORT);
});
