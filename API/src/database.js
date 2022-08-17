import * as mysql from "mysql";
import * as dotenv from "dotenv";
import { createTables } from "../db/createTables.js";
dotenv.config();

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
});

mysqlConnection.connect(async function (err) {
  try {
    if (err) throw new Error("Db is not connected");
    console.log("Db is connected");
    await createTables();
  } catch (err) {
    console.log(err);
  }
});

export default mysqlConnection;
