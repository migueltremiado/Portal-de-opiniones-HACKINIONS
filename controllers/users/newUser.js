const getConnection = require("../../db");
const { generateError } = require("../../helpers");
const bcrypt = require("bcrypt");

async function newUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { username, email, password, name, lastname, bio } = req.body;

    if (!email || !password || !username) {
      throw generateError(
        "debes introducir un email, contraseña y nombre se usuario",
        400
      );
    }
    //seleccioname y devuelveme si estan este email
    let [existingUser] = await connection.query(
      `
      SELECT id
      FROM users
      WHERE email = ? 
        `,
      [email]
    );

    if (existingUser.length > 0) {
      throw generateError(`Ya existe un usuario con este email`, 409);
    }

    [existingUser] = await connection.query(
      `
        SELECT id
        FROM users
        WHERE username = ?
          `,
      [username]
    );

    if (existingUser.length > 0) {
      throw generateError(`Ya existe un usuario con este username`, 409);
    }
    //bcrypt nos permite encriptar los password
    const passwordHash = await bcrypt.hash(password, 8);

    await connection.query(
      `
      INSERT INTO users(username, email, password, name, last_name, bio)
      VALUES(?, ?, ?, ?, ?, ?);
        `,
      [username, email, passwordHash, name, lastname, bio]
    );

    res.send({
      status: "ok",
      message: "Nuevo usuario creado",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = newUser;
