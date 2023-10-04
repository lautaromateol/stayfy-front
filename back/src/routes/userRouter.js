const { Router } = require("express");
const { User } = require("../db");
const userRouter = Router();

userRouter.get('/', async(req, res)=>{
try {
    const users = await User.findAll()
    res.json(users)
} catch (error) {
    console.error(error)
}
})

module.exports = {userRouter}