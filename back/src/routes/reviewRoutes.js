const { Router } = require("express");
const { createReview, updateReview, deleteReview } = require("../controllers/review/reviewController");

const reviewRouter = Router();

reviewRouter.post("/", createReview);
reviewRouter.put("/", updateReview);
reviewRouter.delete("/:id", deleteReview);

module.exports = { reviewRouter };
