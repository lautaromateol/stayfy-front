const { Router } = require("express");
const { getBooksHandler } = require("../handlers/getBooksHandler");
const { getByIDHandler } = require("../handlers/getByIDHandler");
const { getByName } = require("../controllers/getByNameController");

const booksRouter = Router();

booksRouter.get("/", getBooksHandler);
booksRouter.get("/search", getByName);
booksRouter.get("/:id", getByIDHandler);
// booksRouter.post("/create", postHandler);

module.exports = { booksRouter };