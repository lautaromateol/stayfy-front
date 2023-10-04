const { Router } = require("express");
const login = require("../controllers/users/login");
const createUser = require("../controllers/users/createUser");

const userRoutes = Router()


userRoutes.post('/', createUser);
userRoutes.post('/login', login);


module.exports = { userRoutes };
