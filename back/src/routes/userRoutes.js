const { Router } = require("express");
const login = require("../controllers/users/login");
const createUser = require("../controllers/users/createUser");

const userRouter = Router()


userRouter.post('/', createUser);
userRouter.post('/login', login);


module.exports = { userRouter };
