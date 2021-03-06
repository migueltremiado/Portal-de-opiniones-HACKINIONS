const getConnection = require('../../db');
const { generateError } = require('../../helpers');

async function newHackEntries(req, res, next) {
  let connection;
  try {
    const userId = req.userId;
    //Tenemos los campos query necesitamos
    console.log('servidor', userId, req.body);

    const { title, content } = req.body;
    if (!content || !title) {
      throw generateError('debes introducir un contenido y título', 400);
    }
    if (content.length > 250) {
      throw generateError('Content debe tener menos de 250 caracteres', 400);
    }
    if (title.length > 100) {
      throw generateError(' Title debe tener menos de 100 caracteres', 400);
    }

    connection = await getConnection();

    const response = await connection.query(
      `
        INSERT INTO hackentries(title, content, user_id)
        VALUES(?, ?, ?);
          `,
      [title, content, userId]
    );
    console.log(response[0].insertId);
    res.send({
      status: 'ok',
      message: 'Creada nueva Hackentries',
      lastId: response[0].insertId,
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
