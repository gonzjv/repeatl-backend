import express from "express";
import { stdout } from "process";
import { PORT_NODE_HOST } from "./common/config";

const app = express();
app.use(express.json());
app.use("/", (req, res, next): undefined | void => {
  if (req.originalUrl === "/") {
    res.send("Service is running!");
    return;
  }
  next();
});

app.listen(PORT_NODE_HOST, () => {
  stdout.write(`App is running on http://localhost:${PORT_NODE_HOST} \n`);
});
