const { Router } = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { booksRouter } = require("./booksRoutes");
// const { teamsRouter } = require("./teamsRoutes.js");

const router = Router();

router.use(morgan("dev"));
router.use(cors());

router.use('/books', booksRouter);
// router.use('/teams', teamsRouter);

module.exports = router;