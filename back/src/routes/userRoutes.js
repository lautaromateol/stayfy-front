const { Router } = require("express");
const login = require("../controllers/users/login");
const createUser = require("../controllers/users/createUser");
const getUsers = require("../controllers/users/getUsers.js")
const getUserById = require("../controllers/users/getUserById");
const getUserByEmail = require("../controllers/users/getUserByEmail");
const deleteUser = require("../controllers/users/deleteUser");
const updateUser = require("../controllers/users/updateUser");
const checkGoogle = require("../controllers/users/checkGoogle");
const googleCreate = require("../controllers/users/googleCreate");
const forgotPassword = require("../controllers/users/forgotPassword");
const resetPassword = require("../controllers/users/resetPassword");
const { use } = require(".");
const userRouter = Router()


userRouter.get('/', getUsers);
userRouter.get('/search/:email', getUserByEmail);
userRouter.get('/:id', getUserById)
userRouter.post('/', createUser);
userRouter.post('/login', login);
userRouter.post('/check', checkGoogle);
userRouter.post('/google', googleCreate);
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password/:id', resetPassword)
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser)

module.exports = { userRouter };
