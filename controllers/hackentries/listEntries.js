const getConnection = require("../../db");
const { generateError } = require("../../helpers");

async function listEntries(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const queryResult = await connection.query(
      `
            SELECT * FROM hackentries 
            ORDER BY created_at DESC
            `
    );

    const [result] = queryResult;
    res.send({
      status: "ok",
      message: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = listEntries;
