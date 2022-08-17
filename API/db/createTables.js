import mysqlConnection from "../src/database.js";

export async function createTables() {
  try {
    mysqlConnection.query("DESCRIBE user", async (e) => {
      if (e) {
        console.log(`Table "user" doest exist`);
        mysqlConnection.query(
          `CREATE TABLE user(
                      id INT(11) AUTO_INCREMENT PRIMARY KEY,
                        email VARCHAR(60) NOT NULL,
                        password VARCHAR(120) NOT NULL,
                        createAT VARCHAR(80)
                    );`
        );
        console.log(`Table "user" created successfully`);
      }
    });
    mysqlConnection.query("DESCRIBE todo", async (e) => {
      if (e) {
        console.log(`Table "todo" doest exist`);
        mysqlConnection.query(
          `CREATE TABLE todo(
              id INT(11) AUTO_INCREMENT PRIMARY KEY,
                idUser  INT(11) NOT NULL,
                content VARCHAR(200) NOT NULL,
                date VARCHAR(80)
            );`
        );
        await createTables();
        console.log(`Table "todo" created successfully`);
      }
    });
    return;
  } catch (error) {
    console.log(error);
  }
}
