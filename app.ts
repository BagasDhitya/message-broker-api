import express from "express";
import messageRouter from "./src/routers/message.router";

const app = express();

app.use(express.json());
app.use("/messages", messageRouter);

export default app;
