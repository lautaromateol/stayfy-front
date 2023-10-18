const { Router } = require("express");
const { createReview, updateReview, deleteReview, getAverageRating, getReviewsByBookId, getReviewByUserAndBookId } = require("../controllers/review/reviewController");

const reviewRouter = Router();

reviewRouter.post("/", createReview);
reviewRouter.put("/", updateReview);
reviewRouter.delete("/:id", deleteReview);
reviewRouter.get("/average/:bookId", getAverageRating);
reviewRouter.get("/reviews/:bookId", getReviewsByBookId);
reviewRouter.get("/user/:id_user/book/:bookId", getReviewByUserAndBookId);

module.exports = { reviewRouter };
