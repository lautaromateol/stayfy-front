const { Router } = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { booksRouter } = require("./booksRoutes");
const { mercadopagoRouter } = require("./mp-router");

const router = Router();

router.use(morgan("dev"));
router.use(cors());

router.use('/books', booksRouter);
router.use('/checkout/mercado-pago', mercadopagoRouter)

module.exports = router;