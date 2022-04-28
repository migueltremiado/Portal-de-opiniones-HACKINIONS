const getConnection = require("../../db");
const { generateError } = require("../../helpers");

async function changeHack(req, res, next) {
  let connection;
  // //Creamos una variable para utulizar req
  // let id = req.userId;
  // //Hacemos un destructuring para llamar a lo que vamos a invocar lo que queremos modificar
  // let { username, email } = req.body;
  //await database.user.udpate({ username, email }); ESTO NO SE QUE ES, PERO DA ERROR

  // try {
  //   await connection.query(
  //     `
  //       INSERT INTO changeHack(username, email)      ESTAS INSERTANDO ALGO EN UNA TABLA QUE NO EXISTEM CHANGEHACK NO EXSISTE,
  //LO QUE HAY QUE HACER ES MODIFICAR EL USER EN LA TABLA USERS
  //       VALUES(?, ?);
  //         `,
  //     [username, email]
  //   );
  try {
    //Creamos una variable para utulizar req
    let id = req.userId;
    //Hacemos un destructuring para llamar a lo que vamos a invocar lo que queremos modificar
    let { username, email } = req.body;

    if (!email || !username) {
      throw generateError("debes introducir un email y nombre se usuario", 400);
    }

    connection = await getConnection();

    await connection.query(
      `
          UPDATE users SET username = ?, email = ?
          where id = ?;
            `,
      [username, email, req.userId]
    );
    res.send({
      status: "ok",
      message: "Se ha cambiado el username y el email",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = changeHack;
