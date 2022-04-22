//declararamos express
const express = require("express");
const Joi = require("@hapi/joi");
//para ver ficheros
const fileupload = require("express-fileupload");

//Requerimos a user para hacer un get
const listUsers = "./controllers/listUsers.js";

//Declaramos  app
const app = express();
app.use(express.json());
//Para que todas las peticiones que pasen por este middeware, express cogera el body y lo
//Preparara para visualizar el json

//La peticiones por este middeware y visualizamos la url tomando al body
app.use(express.urlencoded({ extended: true }));

//preparara para visualizar el ficheros, cuando recibamos un fordata
app.use(fileupload());

//Probamos el servidor 3000
app.listen(3000, () => {
  console.log("se inicio 3000");
});
