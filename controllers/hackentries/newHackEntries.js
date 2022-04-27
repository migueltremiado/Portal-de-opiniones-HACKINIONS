const getConnection = require("../../db");
const { generateError } = require("../../helpers");

async function newHackEntries(req, res, next) {
  let connection;
  try {
    const userId = req.userId;
    //Tenemos los campos query necesitamos
    const { title, content } = req.body;
    if (!content || !title) {
      throw generateError("debes introducir un contenido y título", 400);
    }
    if (content.length > 250) {
      throw generateError("Content debe tener menos de 250 caracteres", 400);
    }
    if (title.length > 100) {
      throw generateError(" Title debe tener menos de 100 caracteres", 400);
    }

    connection = await getConnection();

    await connection.query(
      `
        INSERT INTO hackentries(title, content, user_id)
        VALUES(?, ?, ?);
          `,
      [title, content, userId]
    );

    res.send({
      status: "ok",
      message: "Creada nueva Hackentries",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = newHackEntries;
