const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    //Miramos se llega la cabecera de la autorización
    //Comprobamos que es un token valido

    if (!authorization) {
      throw generateError("Falta la cabecera de la autorización", 401);
    }
    //Comprobamos que el token sea correcto
    let token;

    try {
      token = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError("Token incorrecto", 401);
    }

    //Metemos la información del token en la request para usarla en el controlador

    //Iguala el usuario con el token
    //Avisa que ese usuario tiene esa encriptacion
    req.userId = token.id;

    //Saltamos al controlador
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authUser;
