const { Router } = require("express");
const { createReview, updateReview, deleteReview, getAverageRating } = require("../controllers/review/reviewController");

const reviewRouter = Router();

reviewRouter.post("/", createReview);
reviewRouter.put("/", updateReview);
reviewRouter.delete("/:id", deleteReview);
reviewRouter.get("/average/:bookId", getAverageRating);

module.exports = { reviewRouter };
