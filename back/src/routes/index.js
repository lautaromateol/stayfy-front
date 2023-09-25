const { Router } = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { booksRouter } = require("./booksRoutes");

const router = Router();

router.use(morgan("dev"));
router.use(cors());

router.use('/books', booksRouter);

module.exports = router;