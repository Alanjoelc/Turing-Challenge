import express from "express";
import mysqlConnection from "../database.js";

const router = express.Router();

router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * FROM user", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.post("/newuser", (req, res) => {
  const { email, password } = req.body;
  mysqlConnection.query(
    "select * from user where email = ?",
    [email],
    (err, rows, fields) => {
      if (!rows.length) {
        let date = Date();
        let data = {
          id: null,
          email: email,
          password: password,
          createAT: date,
        };
        mysqlConnection.query(
          "INSERT INTO user SET?",
          data,
          (err, rows, fields) => {
            if (err) {
              throw Error(err);
            } else {
              console.log(rows);
              res.json({
                message: "New user created successfully",
                idNewUser: rows.insertId,
              });
            }
          }
        );
      } else {
        res.json({ message: "The email is already registered" });
      }
    }
  );
});

router.post("/validate", (req, res) => {
  const { email, password } = req.body;
  mysqlConnection.query(
    "select * from user where email = ?",
    [email],
    (err, rows, fields) => {
      if (rows.length) {
        if (rows[0].email === email && rows[0].password === password) {
          res.json(`` + rows[0].id);
        } else {
          res.json("Password is incorrect");
        }
      }
      if (!rows.length) {
        res.json("Unregistered email");
      }
    }
  );
});

export default router;
