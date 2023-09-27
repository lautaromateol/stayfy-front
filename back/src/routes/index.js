const { Router } = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { booksRouter } = require("./booksRoutes");
const { paymentRouter } = require("./paymentRouter");

const router = Router();

// router.use(morgan("dev"));
// router.use(cors());

router.use('/books', booksRouter);
router.use('/checkout', paymentRouter)

module.exports = router;