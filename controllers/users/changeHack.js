const getConnection = require("../../db");
const { generateError } = require("../../helpers");

async function changeHack(req, res) {
  let connection;
  //Creamos una variable para utulizar req
  let id = req.param.id;
  //Hacemos un destructuring para llamar a lo que vamos a invocar lo que queremos modificar
  let { username, email } = req.body;
  await database.user.udpate({ username, email });

  try {
    await connection.query(
      `
        INSERT INTO changeHack(username, email)
        VALUES(?, ?);
          `,
      [username, email]
    );

    res.send({
      status: "ok",
      message: "Cambio realizado",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
console.log("esta funcionando");
module.exports = changeHack;
