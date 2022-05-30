const getConnection = require("../../db");
const { generateError } = require("../../helpers");
const bcrypt = require("bcrypt");

async function changePassword(req, res, next) {
  let connection;
  try {
    let id = req.userId;

    let { password } = req.body;

    if (!password) {
      throw generateError("debes introducir una password", 400);
    }
    const passwordHash = await bcrypt.hash(password, 8);

    connection = await getConnection();

    await connection.query(
      `
      UPDATE users SET password = ?
      where id = ?;
        `,
      [passwordHash, req.userId]
    );

    res.send({
      status: "ok",
      message: "se ha actualizado la contraseña",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = changePassword;
