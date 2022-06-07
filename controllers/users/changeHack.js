const getConnection = require('../../db');
const { generateError } = require('../../helpers');

async function changeHack(req, res, next) {
  let connection;

  try {
    //Creamos una variable para utilizar req
    let id = req.userId;
    //Hacemos un destructuring para llamar a lo que vamos a invocar lo que queremos modificar
    let { username, email, name, last_name, bio } = req.body;

    if (!email || !username) {
      throw generateError('debes introducir un email y nombre se usuario', 400);
    }

    connection = await getConnection();

    await connection.query(
      `
          UPDATE users SET username = ?, email = ?, name = ?, last_name = ?,bio = ?
          where id = ?;
            `,
      //Modificamos la tabla req.userId
      [username, email, name, last_name, bio, req.userId]
    );
    res.send({
      status: 'ok',
      message: 'Se han cambiado tus datos de usuario',
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
