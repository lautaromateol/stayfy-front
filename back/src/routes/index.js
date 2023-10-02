const { Router } = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { booksRouter } = require("./booksRoutes");
const { genresRouter } = require("./genresRoutes");
const { mercadopagoRouter } = require("./mp-router");

const router = Router();

router.use(morgan("dev"));
router.use(cors());

router.use('/books', booksRouter);
router.use('/genres', genresRouter);
router.use('/checkout/mercado-pago', mercadopagoRouter)

module.exports = router;