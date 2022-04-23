require("dotenv").config();

//declararamos express
const express = require("express");
const morgan = require("morgan");
const listEntries = require("./controllers/hackentries/listEntries");
//const Joi = require("@hapi/joi");
//para ver ficheros
//const fileupload = require("express-fileupload");

//Requerimos a user para hacer un get
const listUsers = "./controllers/listUsers.js";

//Declaramos  app
const app = express();

const port = process.env.PORT;

app.use(morgan("dev"));

//endpoint home

app.get("/", (req, res) => {
  res.status(200).send({
    status: "ok",
    message: "Bienvenido a Hackinions!!!",
  });
});

//endPoint entries

app.get("/hackentries", listEntries);

//middleware de los errores

app.use((error, req, res, next) => {
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

//middelware de not found

app.use((req, res) => {
  res.status(404).send({
    status: "ko",
    message: "Not found",
  });
});
//app.use(express.json());
//Para que todas las peticiones que pasen por este middeware, express cogera el body y lo
//Preparara para visualizar el json

//La peticiones por este middeware y visualizamos la url tomando al body
//app.use(express.urlencoded({ extended: true }));

//preparara para visualizar el ficheros, cuando recibamos un fordata
//app.use(fileupload());

//Probamos el servidor 3000
app.listen(port, () => {
  console.log(`se inicio localhost:${port}`);
});
