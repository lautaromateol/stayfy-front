const { Router } = require("express");
const login = require("../controllers/users/login");
const createUser = require("../controllers/users/createUser");
const getUsers = require("../controllers/users/getUsers.js")
const getUserById = require("../controllers/users/getUserById");
const deleteUser = require("../controllers/users/deleteUser");
const updateUser = require("../controllers/users/updateUser")

const userRouter = Router()

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById)
userRouter.post('/', createUser);
userRouter.post('/login', login);
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)

module.exports = { userRouter };
