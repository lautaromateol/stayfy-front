const {User} = require("../../db")
const { DEFAULT_PROFILE_PICTURE, ENDPOINT } = require("../../utils")
const axios = require("axios")

const createUser = async(req, res) => {
    try {
       const {username, email, password, fullname, profilePicture} = req.body 

       const emailFilter = await User.findOne({where: {email}})

       if(emailFilter) return res.status(400).send('This email is already registered')

       const usernameFilter = await User.findOne({where: {username}})

       if(usernameFilter) return res.status(400).send('This username is in use')

       const newUser = {
        username,
        email,
        passwordHash: password,
        fullName: fullname,
        profilePicture: profilePicture ? profilePicture :  DEFAULT_PROFILE_PICTURE,
       }

       const userDb = await User.create(newUser)
       
       await axios.post(`${ENDPOINT}/mail/register`, {email: userDb.email})

       res.status(201).json(userDb)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = createUser;