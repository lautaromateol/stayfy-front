const { Review, conn, User  } = require("../../db");
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

// Obtener el promedio de calificaciones por bookId
exports.getAverageRating = async (req, res) => {
    try {
        const bookId = req.params.bookId;

        const result = await Review.findOne({
            attributes: [
                [conn.fn("AVG", conn.col("rating")), "averageRating"],
            ],
            where: {
                bookId: bookId,
            },
        });

        if (!result) {
            return res.status(404).json({ message: "No se encontraron reseñas para este libro" });
        }

        const averageRating = result.dataValues.averageRating;

        res.json({ averageRating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al calcular el promedio de calificaciones" });
    }
};

exports.getReviewsByBookId = async (req, res) => {
    try {
        const bookId = req.params.bookId;

        const reviews = await Review.findAll({
            where: {
                bookId: bookId,
            },
            include: [User],
        });

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No se encontraron reseñas para este libro" });
        }

        res.json({ reviews });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las reseñas" });
    }
};

exports.getReviewByUserAndBookId = async (req, res) => {
    try {
        const { id_user, bookId } = req.params;

        const review = await Review.findOne({
            where: {
                userId: id_user,
                bookId: bookId,
            },
        });

        if (!review) {
            return res.status(404).json({ message: "No se encontró una reseña para este libro y usuario" });
        }

        res.json({ review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la reseña del usuario para este libro" });
    }
};
