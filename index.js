"use strict";

const ps = require("prompt-sync");
const dotenv = require("dotenv");
const minimist = require("minimist");
const chalk = require("chalk");
const path = require("path");
const fs = require("fs/promises");

console.log(chalk.green("Inicio del Proyecto"));
console.log();

const args = minimist(process.argv);
console.log(chalk.green("En proceso"));
console.log();
