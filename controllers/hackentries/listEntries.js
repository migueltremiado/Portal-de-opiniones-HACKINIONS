const getConnection = require('../../db');
//const { generateError } = require('../../helpers');

async function listEntries(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    //en ejemplo conection es lo que queremos
    //query es le metodo para solicitar la peticion de la base datos

    // la llamada de la base datos
    const queryResult = await connection.query(
      //esta funcion nos permite hacer la peticion de sql
      //devuelve toda la informacion de la tabla hackentries
      `
          SELECT hackentries.id as hackId , title,content, users.id as userId, users.name,users.username, hackentries.created_at FROM hackentries inner join users on users.id = hackentries.user_id
          WHERE  estatus =1
          ORDER BY hackentries.created_at DESC
    `
    );

    //     const queryResult = await connection.query(
    //       //esta funcion nos permite hacer la peticion de sql
    //       //devuelve toda la informacion de la tabla hackentries
    //       `
    //       select d.entry_id, d.title, d.content, d.created_at, d.username, d.positivos, e.negativos from (select c.username as username,
    //         a.id as entry_id,
    //         count(*) as positivos from hackentries a,
    //         hackvotes b, users c where c.id = a.user_id and b.vote = 1 and b.hackentries_id = a.id and a.estatus=1 group by a.id) d left outer join
    //         (select c.username as username,
    //         a.id as entry_id,
    //         count(*) as negativos from hackentries a,
    //         hackvotes b, users c where c.id = a.user_id and b.vote = -1 and b.hackentries_id = a.id and a.estatus=1 group by a.id) e on d.entry_id = e.entry_id
    //         UNION ALL
    //         select d.entry_id, d.username, e.positivos, d.negativos from (select c.username as username,
    //         a.id as entry_id,
    //         count(*) as negativos from hackentries a,
    //         hackvotes b, users c where c.id = a.user_id and b.vote = -1 and b.hackentries_id = a.id and a.estatus=1 group by a.id) d left outer join
    //         (select c.username as username,
    //         a.id as entry_id,
    //         count(*) as positivos from hackentries a,
    //         hackvotes b, users c where c.id = a.user_id and b.vote = 1 and b.hackentries_id = a.id and a.estatus=1 group by a.id) e on d.entry_id = e.entry_id;
    // `
    //     );

    //lo guarda en result
    const [result] = queryResult;
    res.send({
      status: 'ok',
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
