const { Router } = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { booksRouter } = require("./booksRoutes");
const { mercadopagoRouter } = require("./mpRoutes");
const { orderRouter } = require("./orderRoutes");
const { userRouter } = require("./userRoutes");
const { mailRouter} = require("./mailRoutes")

const { reviewRouter } = require("./reviewRoutes");

const router = Router();

router.use(morgan("dev"));
router.use(cors());

router.use('/users', userRouter)
router.use('/books', booksRouter);
router.use('/checkout/mercado-pago', mercadopagoRouter)
router.use('/orders', orderRouter)
router.use('/mail', mailRouter)
router.use('/review', reviewRouter)

module.exports = router;