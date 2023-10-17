const { Review } = require("../../db");
// Crear una nueva reseña
exports.createReview = async (req, res) => {
    try {
        const { userId, bookId, rating, title, message } = req.body;

        const newReview = await Review.create({
            userId,
            bookId,
            rating,
            title,
            message,
        });

        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la reseña" });
    }
};

// Actualizar una reseña existente
exports.updateReview = async (req, res) => {
    try {
        const { id, rating, title, message } = req.body;

        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({ message: "Reseña no encontrada" });
        }

        review.rating = rating;
        review.title = title;
        review.message = message;

        await review.save();

        res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la reseña" });
    }
};

// Eliminar una reseña
exports.deleteReview = async (req, res) => {
    try {
        const id = req.params.id;

        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({ message: "Reseña no encontrada" });
        }

        await review.destroy();

        res.json({ message: "Reseña eliminada con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la reseña" });
    }
};
