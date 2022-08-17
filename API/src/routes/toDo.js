import express from "express";
import mysqlConnection from "../database.js";

const toDoRouter = express.Router();

toDoRouter.get("/:id", (req, res) => {
  let { id } = req.params;
  mysqlConnection.query(
    "SELECT * FROM todo WHERE idUser = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        if (rows.length) {
          res.json(rows);
        } else {
          res.json({ message: "This user has no tasks yet" });
        }
      } else {
        throw new Error(err);
      }
    }
  );
});

toDoRouter.post("/newtodo", (req, res) => {
  let { idUser, content } = req.body;
  let dateNow = Date();
  let data = {
    id: null,
    idUser: idUser,
    content: content,
    date: dateNow,
  };
  mysqlConnection.query(
    "INSERT INTO todo SET?",
    [data],
    (err, rows, fields) => {
      if (!err) {
        res.json({ id: `` + rows.insertId });
      } else {
        res.json({ message: "incomplete fields" });
      }
    }
  );
});

toDoRouter.delete("/deletetodo", (req, res) => {
  let { idTodo } = req.body;

  mysqlConnection.query(
    "DELETE FROM todo Where id =?",
    [idTodo],
    (err, rows, fields) => {
      if (!err) {
        res.json({ message: "Todo deleted" });
      } else {
        throw new Error(err);
      }
    }
  );
});

export default toDoRouter;
