import * as dotenv from "dotenv";
import express from "express";
import router from "./routes/user.js";
import toDoRouter from "./routes/toDo.js";

dotenv.config();
const app = express();

console.log(process.env.PORT);

app.set("port", process.env.PORT || 3000);

app.use(express.json());

app.use(router);
app.use("/todo", toDoRouter);

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
