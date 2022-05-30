const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getConnection = require("../../db");
const { generateError } = require("../../helpers");

async function userLogin(req, res, next) {
  let connection;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError("debes introducir un email y contraseña", 400);
    }

    //Recojemos los datos de la database del usuario con ese email
    connection = await getConnection();

    const queryResult = await connection.query(
      `
            SELECT id, username, email, password 
            FROM users 
            WHERE email=?
        `,
      [email]
    );

    const [result] = queryResult;

    if (result.length === 0) {
      throw generateError("no hay ningun usuario con ese email", 404);
    }

    //compruebo que las contraseñas coninciden

    const validPassword = await bcrypt.compare(password, result[0].password);

    if (!validPassword) {
      throw generateError("La contraseña no coincide", 401);
    }

    //creo el playload del token
    const payload = { id: result[0].id };

    //firmo el token
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "30d",
    });
    //envio el token

    res.send({
      status: "ok",
      message: token,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = userLogin;
