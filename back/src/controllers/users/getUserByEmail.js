const { User } = require("../../db")

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({
            where: { email: email },
            attributes: ['userId','isAdmin','isSuperAdmin'],
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al buscar el usuario por email" });
    }
};

module.exports = getUserByEmail