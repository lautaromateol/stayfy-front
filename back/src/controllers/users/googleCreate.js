const {User} = require("../../db");

const googleCreate = async(req, res) => {
    try {
        const { email, given_name, name, picture } = req.body
        
        const googleUser = {
            username: given_name,
            email,
            fullName: name,
            profilePicture: picture
        }
        const newUser = await User.create(googleUser);
        res.status(201).json(newUser);

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el usuario' });
      }
}
        
module.exports = googleCreate 
        
    
