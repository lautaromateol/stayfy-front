const { Router } = require("express");
const { getGenresHandler } = require("../handlers/genresHandler");

const genresRouter = Router();

genresRouter.get("/", getGenresHandler);

module.exports = { genresRouter };