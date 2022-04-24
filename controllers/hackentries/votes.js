const getConnection = require("../../db");
const { generateError } = require("../../helpers");

async function newVote(req, res, next) {
  let connection;

  try {
    const { vote } = req.body;
    console.log(vote);
    if (vote === undefined) {
      throw generateError("No se está recibiendo el voto", 400);
    }

    const { idEntry } = req.params;

    if (!idEntry) {
      throw generateError(
        "No se ha localizado el identificador del comentario",
        400
      );
    }

    //compruebo si exite el id en la base de datos
    connection = await getConnection();

    const queryResult = await connection.query(
      `
              SELECT id
              FROM hackentries
              WHERE id=?
          `,
      [idEntry]
    );

    const [result] = queryResult;

    if (result.length === 0) {
      throw generateError("no hay ningun comentario con ese id", 400);
    }

    const existVote = await connection.query(
      `
                SELECT id
                FROM hackvotes
                WHERE hackentries_id=? AND user_id=?
            `,
      [idEntry, req.userId]
    );
    const [resultVote] = existVote;

    if (resultVote.length > 0) {
      throw generateError(
        `el usuario ${req.userId} ya ha votado al comentario ${idEntry}`,
        409
      );
    }

    await connection.query(
      `
        INSERT INTO hackvotes(vote, user_id, hackentries_id)
        VALUES(?, ?, ?);
          `,
      [vote, req.userId, idEntry]
    );

    res.send({
      status: "ok",
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

module.exports = newVote;
