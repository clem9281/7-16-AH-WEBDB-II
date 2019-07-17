const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const recipeRouter = require("./routers/recipeRouter");
const { errorHandler } = require("./middleware");

const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(cors());

server.get("/", (req, res) => res.send("<h1>AH 7/16</h1>"));
server.use("/api/recipes", recipeRouter);
server.use(errorHandler);
module.exports = server;
