const {User} = require("../../db");
const bcrypt = require('bcrypt');

const createUser = async(req, res) => {
    try {
        const {username, email, password, fullname} = req.body 
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
    

       const emailFilter = await User.findOne({where: {email}})

       if(emailFilter) return res.status(400).send('This email is already registered')

       const usernameFilter = await User.findOne({where: {username}})

       if(usernameFilter) return res.status(400).send('This username is in use')

       const newUser = {
        username,
        email,
        passwordHash,
        fullName: fullname
       }

       const userDb = await User.create(newUser)
       res.status(201).json(userDb)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = createUser;