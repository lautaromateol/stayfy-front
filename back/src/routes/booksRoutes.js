const { Router } = require("express");
const { getBooksHandler } = require("../handlers/getBooksHandler");
const { getByIDHandler } = require("../handlers/getByIDHandler");

const booksRouter = Router();

booksRouter.get("/", getBooksHandler);
booksRouter.get("/:id", getByIDHandler);
// booksRouter.post("/create", postHandler);

module.exports = { booksRouter };