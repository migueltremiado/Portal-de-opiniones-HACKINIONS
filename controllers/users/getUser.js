const getConnection = require("../../db");

async function getUser(req, res, next) {
  let connection;

  try {
    //Creamos una variable para utilizar req
    let id = req.userId

    connection = await getConnection();

    const queryResult = await connection.query(
      `
      SELECT  username, email,name, last_name,bio,created_at FROM hackinions.users
      where id = ?;`,[id]
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

module.exports = getUser;