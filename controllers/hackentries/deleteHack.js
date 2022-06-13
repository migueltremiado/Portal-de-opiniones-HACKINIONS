const getConnection = require('../../db');
const { generateError } = require('../../helpers');

async function deleteHack(req, res, next) {
  let connection;
  const { idEntry } = req.params;
  console.log(idEntry);

  try {
    const { idEntry } = req.params;
    console.log(idEntry);
    if (!idEntry) {
      throw generateError(
        'No se ha localizado el identificador del comentario',
        400
      );
    }
    //compruebo si exite el id en la base de datos
    connection = await getConnection();
    const queryResult = await connection.query(
      `
              UPDATE hackentries SET estatus = 0
              WHERE id=?
          `,
      [idEntry]
    );

    const [result] = queryResult;
    console.log(result);
    if (result.length === 0) {
      throw generateError('no hay ningun comentario con ese id', 400);
    }

    res.send({
      status: 'ok',
      message: `El usuario ${req.userId} ha votado correctamente`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = deleteHack;
